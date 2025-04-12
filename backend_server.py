import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS # Import CORS
from dotenv import load_dotenv
import glob # To find HTML files
from bs4 import BeautifulSoup # To parse HTML

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# --- CORS Configuration ---
# Allows requests from your frontend's origin (e.g., http://127.0.0.1:5500)
# You might want to restrict this to your specific domain in production
CORS(app, resources={r"/api/*": {"origins": "*"}}) 

# --- Gemini API Configuration ---
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("Error: GEMINI_API_KEY not found in .env file.")
    # In a real app, you might want to exit or handle this differently
    # For now, we'll let it proceed but Gemini calls will fail.
    # exit(1)

try:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-pro-latest') 
    print("Gemini AI configured successfully.")
except Exception as e:
    print(f"Error configuring Gemini AI: {e}")
    model = None # Ensure model is None if configuration fails

# --- RAG: Knowledge Loading ---
knowledge_base = {} # Dictionary to store content: {filename: text_content}

def extract_text_from_html(html_content):
    """Extracts meaningful text from HTML content using BeautifulSoup."""
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Remove script and style elements
    for script_or_style in soup(['script', 'style', 'nav', 'footer', '.chat-container', '#chat-window', '#chat-toggle-button']): # Added common non-content elements
        script_or_style.decompose()

    # Get text, joining paragraphs/sections with newlines for clarity
    # Consider targeting specific tags like p, h1, h2, h3, li, td if needed
    text = soup.get_text(separator='\n', strip=True) 
    return text

def load_website_content(directory="."):
    """Loads and parses text content from HTML files in the specified directory."""
    global knowledge_base
    print(f"Loading website content from HTML files in '{directory}'...")
    html_files = glob.glob(os.path.join(directory, "*.html")) 
    # Exclude specific files if needed, e.g., files related to templates or testing
    # html_files = [f for f in html_files if not f.endswith(('_template.html', 'test.html'))] 
    
    loaded_count = 0
    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                text_content = extract_text_from_html(content)
                filename = os.path.basename(file_path)
                knowledge_base[filename] = text_content
                # print(f"  - Loaded and parsed: {filename}") # Optional: print progress
                loaded_count += 1
        except Exception as e:
            print(f"  - Error reading or parsing {file_path}: {e}")
            
    print(f"Finished loading content. {loaded_count} HTML files processed.")

# Load content when the server starts
load_website_content() 

# --- RAG: Basic Retrieval Function (Placeholder) ---
def find_relevant_context(query, top_n=3):
    """
    Finds relevant text snippets from the knowledge base based on the query.
    (This is a very basic keyword matching implementation for now)
    """
    relevant_snippets = []
    query_terms = set(query.lower().split()) 

    # Simple keyword matching for demonstration
    for filename, text in knowledge_base.items():
        text_lower = text.lower()
        if any(term in text_lower for term in query_terms if len(term) > 2): # Check if any query term exists
             # For simplicity, return a chunk of text around the first match or just the beginning
             # A real implementation would be much more sophisticated (TF-IDF, embeddings, etc.)
             
             # Let's just return the filename and the first few hundred chars for now
             # snippet = f"From {filename}:\n{text[:500]}...\n---\n" # Original line causing error
             snippet = f"""From {filename}:
{text[:500]}...
---"""
             relevant_snippets.append(snippet)
             
             # Limit the number of snippets returned
             if len(relevant_snippets) >= top_n:
                 break # Stop once we have enough snippets

    if not relevant_snippets:
        return "No specific context found on the website for this query."
        
    return "\n".join(relevant_snippets)

# --- API Endpoint ---
@app.route('/api/chat', methods=['POST'])
def handle_chat():
    if not model:
        return jsonify({"error": "Gemini AI model not configured. Check API key."}), 500

    try:
        data = request.get_json()
        if not data or 'history' not in data:
            return jsonify({"error": "Missing conversation history in request"}), 400

        history = data['history']
        last_user_message = ""
        # Find the last actual user message in the history
        for i in range(len(history) - 1, -1, -1):
             if history[i]['role'] == 'user' and history[i].get('parts') and history[i]['parts'][0].get('text'):
                 # Check if it's the system prompt; we only want the actual user message
                 if i > 0 or len(history) == 1: # Avoid grabbing the system prompt if it's the very first message
                     last_user_message = history[i]['parts'][0]['text']
                     break

        if not last_user_message:
             # Handle cases where history might only contain system prompt initially
             if len(history) > 0 and history[-1]['role'] == 'user': # Maybe the last one WAS the user msg
                  last_user_message = history[-1]['parts'][0]['text']
             else:
                 return jsonify({"error": "No valid user message found in history"}), 400

        # --- RAG Step: Retrieve Context ---
        print(f"Retrieving context for query: '{last_user_message}'")
        retrieved_context = find_relevant_context(last_user_message)
        print(f"Retrieved Context:\n{retrieved_context}\n---")

        # --- RAG Step: Augment Prompt ---
        # We construct a new prompt for the model, including context
        # Note: We are NOT passing the raw history directly to start_chat anymore
        # Instead, we manage the conversation turns manually for augmentation.

        # The history sent from the client already includes the system prompt as the first 'user' turn
        # and the model's initial confirmation as the first 'model' turn.
        # We will rebuild the history for the API call, injecting context before the *last* user message.

        augmented_history = history[:-1] # History up to the last user message

        # Create the augmented user message part
        augmented_user_message_content = (
            f"Based on the following context from the website, please answer the user's question:\n\n"
            f"--- START CONTEXT ---\n{retrieved_context}\n--- END CONTEXT ---\n\n"
            f"User Question: {last_user_message}"
        )
        
        # Append the augmented message as the final 'user' turn for the API call
        augmented_history.append({'role': 'user', 'parts': [{'text': augmented_user_message_content}]})

        # Start the chat using the augmented history
        # Important: We use the history argument here, not start_chat() then send_message()
        # as the context needs to be part of the prompt for the *current* turn.
        response = model.generate_content(augmented_history)

        # Extract the bot's response text
        try:
            bot_message_text = response.text
        except Exception as e:
             # Handle cases where the response might be blocked due to safety settings or other issues
             print(f"Error extracting text from response: {e}")
             print(f"Full response object: {response}")
             # Send a generic error or potentially information about blocking if available
             try:
                 # Attempt to get feedback/reason if available
                 block_reason = response.prompt_feedback.block_reason
                 bot_message_text = f"Sorry, I couldn't generate a response for that. Reason: {block_reason}"
             except: 
                 bot_message_text = "Sorry, I encountered an issue generating a response."

        print(f"User (Augmented): {augmented_user_message_content}\nBot: {bot_message_text}") # Log interaction

        # Send only the bot's response text back to the frontend
        return jsonify({"botMessage": bot_message_text})

    except Exception as e:
        print(f"Error during chat processing: {e}")
        import traceback
        traceback.print_exc() # Print detailed traceback for debugging
        return jsonify({"error": "An internal error occurred while processing the chat."}), 500

# --- Health Check Endpoint (Optional) ---
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "Backend server is running"})

# --- Run the Server ---
if __name__ == '__main__':
    # Use 0.0.0.0 to make it accessible on your network if needed
    # Default port is 5000, you can change it
    app.run(host='0.0.0.0', port=5000, debug=True) # debug=True for development, set to False for production 