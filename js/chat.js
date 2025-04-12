document.addEventListener('DOMContentLoaded', () => {
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatWindow = document.getElementById('chat-window');
    const chatCloseButton = document.getElementById('chat-close-button');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    // Exit if chat elements aren't found on this page
    if (!chatToggleButton || !chatWindow || !chatCloseButton || !chatForm || !chatInput || !chatMessages) {
        // console.log('Chat elements not found on this page. Chat script inactive.');
        return; 
    }

    // --- Configuration ---
    // Define the role and instructions for the AI assistant
    const system_prompt = `You are the "ExploreIndia Assistant", a helpful and slightly evocative guide focused on cultural and impactful travel within India, powered by the website content.
Your primary goal is to help users plan their trips by providing concise, relevant information based ONLY on the content available on the website.
ALWAYS reference the specific page URL on the website where the user can find more details (e.g., /destinations.html#agra, /events.html#diwali).
When answering questions about places, events, or experiences:
1.  Use slightly evocative language to make the description engaging (e.g., "breathtaking," "vibrant," "historic grandeur").
2.  Briefly mention key highlights or aspects.
3.  Suggest potential follow-up interests (like history, best time to visit, related experiences) if appropriate, to encourage further interaction.
4.  Provide the relevant website URL for more comprehensive information.
Do NOT make up information or answer questions outside the scope of the website's content. If you cannot find relevant information on the website, politely state that the information isn't available on the site. Keep answers concise.`;

    // Initial message displayed when the chatbot opens
    const first_bot_message = "Namaste! I'm the ExploreIndia Assistant. Ask me about destinations, experiences, events, or planning your trip based on our website content. How can I help you today?";

    let conversationHistory = [
        { role: 'user', parts: [{ text: system_prompt }]},
        { role: 'model', parts: [{ text: 'Okay, I am ready to help users plan their culturally rich and responsible trip to India based on the ExploreIndia website!' }]} 
    ]; 

    // Function to display the very first bot message
    function displayInitialBotMessage() {
        appendMessage(first_bot_message, 'bot');
    }

    // --- Event Listeners (Now safe because we checked elements above) ---
    chatToggleButton.addEventListener('click', toggleChatWindow);
    chatCloseButton.addEventListener('click', closeChatWindow);
    chatForm.addEventListener('submit', handleSendMessage);

    // --- Functions ---
    function toggleChatWindow() {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            chatInput.focus(); // Focus input when opening
        }
    }

    function closeChatWindow() {
        chatWindow.classList.add('hidden');
    }

    function handleSendMessage(event) {
        event.preventDefault();
        const messageText = chatInput.value.trim();
        if (messageText === '') return;

        // Display user message
        appendMessage(messageText, 'user');

        // Add user message to history
        conversationHistory.push({ role: 'user', parts: [{ text: messageText }] });

        // Clear input
        chatInput.value = '';

        // Show typing indicator (optional)
        showTypingIndicator();

        // Get bot response
        getBotResponse(messageText);
    }

    function appendMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-bubble', sender);
        messageDiv.innerHTML = `<p>${text}</p>`; // Use innerHTML to allow basic formatting if needed later
        chatMessages.appendChild(messageDiv);

        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        removeTypingIndicator(); // Remove any existing indicator
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.classList.add('chat-bubble', 'bot');
        typingDiv.innerHTML = `<p><i>Typing...</i></p>`;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async function getBotResponse(userMessage) {
        // ==================================================================
        // DANGER: DO NOT PUT YOUR API KEY HERE IN PRODUCTION!
        // Replace this with a call to your secure backend endpoint.
        // Your backend will add the API key and call the Gemini API.
        // ==================================================================
        
        // --- Point this to your Python backend server --- 
        const YOUR_BACKEND_API_ENDPOINT = 'http://localhost:5000/api/chat'; 
        // const YOUR_GEMINI_API_KEY = 'YOUR_API_KEY_HERE'; // NEVER DO THIS IN CLIENT-SIDE CODE

        try {
            // Prepare payload for your backend (send only history)
            const payload = {
                history: conversationHistory 
            };

            // Call your backend endpoint
            const response = await fetch(YOUR_BACKEND_API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                 throw new Error(`Backend error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json(); // Expect your backend to return the bot's message text

            // Ensure the response format is as expected (e.g., { botMessage: "..." })
            if (data && data.botMessage) {
                const botMessageText = data.botMessage;

                // Remove typing indicator
                removeTypingIndicator();

                // Add bot message to history
                conversationHistory.push({ role: 'model', parts: [{ text: botMessageText }] });

                // Display bot message
                appendMessage(botMessageText, 'bot');
            } else {
                throw new Error('Invalid response format from backend.');
            }

        } catch (error) {
            console.error("Error fetching bot response:", error);
            removeTypingIndicator();
            appendMessage("Sorry, I'm having trouble connecting right now. Please try again later.", 'bot');
        }
    }
});
