// --- Sample Data (Destinations, Activities, etc.) ---
const allItems = [
    { 
        id: 1, 
        name: "Hampi Temples", 
        slug: "hampi-temples",
        tags: ["historical", "culture", "south india", "karnataka"], 
        description: "Explore ancient ruins and majestic temples.",
        longDescription: "Hampi, a UNESCO World Heritage site, was the capital of the Vijayanagara Empire. Its ruins are spread over a vast area, featuring stunning temples, palaces, and royal enclosures.",
        imageUrl: "images/hampi.jpg",
        bestTimeToVisit: "October to February",
        howToReach: "Nearest airport: Hubli (HBX). Nearest railway station: Hosapete (HPT).",
        lat: 15.3350,
        lon: 76.4600
    },
    { 
        id: 2, 
        name: "Coorg Nature Trek", 
        slug: "coorg-nature-trek",
        tags: ["nature", "adventure", "south india", "karnataka", "mountains"], 
        description: "Hike through lush coffee plantations.",
        longDescription: "Known as the 'Scotland of India', Coorg offers breathtaking landscapes, coffee estates, waterfalls, and challenging trekking routes through its misty hills.",
        imageUrl: "images/coorg.jpg",
        bestTimeToVisit: "September to June",
        howToReach: "Nearest airport: Mangalore (IXE) or Kannur (CNN). Nearest railway station: Mysuru (MYS).",
        lat: 12.3375,
        lon: 75.8069
    },
    { 
        id: 3, 
        name: "Mysore Cooking Class", 
        slug: "mysore-cooking-class",
        tags: ["food", "culture", "south india", "karnataka", "experience"], 
        description: "Learn traditional South Indian vegetarian cooking.",
        longDescription: "Immerse yourself in the local culture by learning to cook authentic Mysorean dishes, known for their unique flavors and traditional techniques.",
        imageUrl: "images/mysore-food.jpg",
        bestTimeToVisit: "Throughout the year",
        howToReach: "Mysore has its own airport (MYQ) and railway station (MYS)."
    },
    { 
        id: 4, 
        name: "Goa Beaches", 
        slug: "goa-beaches",
        tags: ["beach", "relaxation", "west india", "goa", "party"], 
        description: "Relax on sandy shores and enjoy the vibrant nightlife.",
        longDescription: "From the bustling beaches of North Goa to the tranquil shores of the South, Goa offers a diverse coastal experience with water sports, shacks, and historical sites.",
        imageUrl: "images/goa.jpg",
        bestTimeToVisit: "November to March",
        howToReach: "Goa has two airports: Dabolim (GOI) and Mopa (GOX). Major railway stations include Madgaon (MAO) and Vasco da Gama (VSG)."
    },
    { 
        id: 5, 
        name: "Jaipur Palaces", 
        slug: "jaipur-palaces",
        tags: ["historical", "culture", "north india", "rajasthan", "city"], 
        description: "Witness the grandeur of Rajput architecture.",
        longDescription: "The 'Pink City' boasts magnificent forts like Amber Fort, City Palace complex, Hawa Mahal, and Jantar Mantar, showcasing Rajput and Mughal architectural styles.",
        imageUrl: "images/jaipur.jpg",
        bestTimeToVisit: "October to March",
        howToReach: "Jaipur has an international airport (JAI) and a major railway station (JP)."
    },
    { 
        id: 6, 
        name: "Rishikesh Yoga Retreat", 
        slug: "rishikesh-yoga-retreat",
        tags: ["wellness", "spirituality", "north india", "uttarakhand", "mountains"], 
        description: "Find peace and rejuvenation by the Ganges.",
        longDescription: "Known as the 'Yoga Capital of the World', Rishikesh offers numerous ashrams and centers for yoga and meditation, set against the backdrop of the Himalayas and the holy Ganges river.",
        imageUrl: "images/rishikesh.jpg",
        bestTimeToVisit: "September to November and February to May",
        howToReach: "Nearest airport: Dehradun (DED). Nearest railway station: Rishikesh (RKSH) or Haridwar (HW)."
    },
    { 
        id: 7, 
        name: "Kerala Backwaters", 
        slug: "kerala-backwaters",
        tags: ["nature", "relaxation", "south india", "kerala", "water"], 
        description: "Cruise through serene backwaters on a houseboat.",
        longDescription: "Explore the tranquil network of lakes, canals, and lagoons parallel to the Arabian Sea coast. Alleppey (Alappuzha) is a popular hub for houseboat cruises.",
        imageUrl: "images/kerala-backwaters.jpg",
        bestTimeToVisit: "September to March",
        howToReach: "Nearest airport: Kochi (COK). Major railway stations: Alleppey (ALLP), Kottayam (KTYM)."
    },
    { 
        id: 8, 
        name: "Mumbai Street Food Tour", 
        slug: "mumbai-street-food-tour",
        tags: ["food", "city", "west india", "maharashtra", "experience"], 
        description: "Taste the diverse and delicious street food of Mumbai.",
        longDescription: "Experience the culinary heart of Mumbai through its vibrant street food scene, featuring iconic dishes like Vada Pav, Pav Bhaji, Bhel Puri, and Pani Puri.",
        imageUrl: "images/mumbai-food.jpg",
        bestTimeToVisit: "October to March",
        howToReach: "Mumbai has a major international airport (BOM) and several major railway stations (CST, LTT, BCT)."
    },
    { 
        id: 9, 
        name: "Taj Mahal", 
        slug: "taj-mahal",
        tags: ["historical", "culture", "landmark", "north india", "uttar pradesh"], 
        description: "An ivory-white marble mausoleum.",
        longDescription: "A UNESCO World Heritage site and one of the New7Wonders of the World, the Taj Mahal is an architectural masterpiece commissioned by Mughal emperor Shah Jahan for his wife Mumtaz Mahal.",
        imageUrl: "images/taj-mahal.jpg", 
        bestTimeToVisit: "October to March",
        howToReach: "Nearest airport: Agra (AGR) or Delhi (DEL). Agra has several railway stations (Agra Cantt - AGC, Agra Fort - AF).",
        lat: 27.1751,
        lon: 78.0421
    },
    { 
        id: 10, 
        name: "Varanasi Ghats", 
        slug: "varanasi-ghats",
        tags: ["spiritual", "culture", "city", "north india", "uttar pradesh"], 
        description: "Experience ancient rituals by the Ganges.",
        longDescription: "One of the oldest living cities in the world, Varanasi's riverfront ghats are used for everything from bathing rituals to cremation ceremonies. A boat ride at dawn is a must-do.",
        imageUrl: "images/varanasi.jpg",
        bestTimeToVisit: "October to March",
        howToReach: "Varanasi has its own airport (VNS) and major railway stations (Varanasi Jn - BSB, Manduadih - MUV).",
        lat: 25.3176,
        lon: 82.9739
    },
    { 
        id: 12, 
        name: "Gateway of India",
        slug: "gateway-of-india",
        tags: ["historical", "city", "west india", "maharashtra", "landmark"], 
        description: "Iconic arch-monument overlooking the Arabian Sea.",
        longDescription: "Built during the 20th century in Mumbai, the Gateway of India is a major landmark and starting point for ferries to Elephanta Caves.",
        imageUrl: "images/gateway-of-india.jpg",
        bestTimeToVisit: "October to March",
        howToReach: "Located in South Mumbai, easily accessible by local train (Churchgate/CST) and taxi/bus."
    },
    { 
        id: 13, 
        name: "Darjeeling Tea Gardens", 
        slug: "darjeeling-tea-gardens",
        tags: ["nature", "mountains", "east india", "west bengal", "relaxation"], 
        description: "Scenic views and world-famous tea.",
        longDescription: "Famous for its tea plantations and stunning views of Kanchenjunga, Darjeeling also offers the Himalayan Railway (Toy Train), monasteries, and vibrant markets.",
        imageUrl: "images/darjeeling.jpg",
        bestTimeToVisit: "March to May and October to November",
        howToReach: "Nearest airport: Bagdogra (IXB). Nearest railway station: New Jalpaiguri (NJP).",
        lat: 27.0410,
        lon: 88.2663
    }
    // Add more items here following the same structure...
];

// --- User Preferences Management (using localStorage) ---

function getUserPreferences() {
    // Attempt to load preferences from localStorage
    const prefsString = localStorage.getItem('userPreferences');
    if (prefsString) {
        try {
            return JSON.parse(prefsString);
        } catch (e) {
            console.error("Error parsing user preferences from localStorage:", e);
            // Return default preferences if parsing fails
            return { interests: [], dietary: [] };
        }
    }
    // Return default preferences if nothing is stored
    return { interests: ["historical", "nature"], dietary: ["vegetarian"] }; // Default example
}

function saveUserPreferences(prefs) {
    // Save preferences to localStorage
    try {
        localStorage.setItem('userPreferences', JSON.stringify(prefs));
    } catch (e) {
        console.error("Error saving user preferences to localStorage:", e);
    }
}

// --- Recommendation Logic ---

function getRecommendations(preferences) {
    const recommendedItems = allItems.filter(item => {
        // Match interests (at least one tag must match)
        const interestMatch = preferences.interests.some(interest => item.tags.includes(interest));
        
        // Add more filtering logic here if needed (e.g., dietary, location, etc.)
        // For now, we just focus on interests
        
        return interestMatch;
    });
    
    return recommendedItems;
}

// --- Display Recommendations ---

function displayRecommendations(items) {
    const recommendationsContainer = document.getElementById('recommendations-container'); 
    if (!recommendationsContainer) {
        console.error("Recommendations container not found!");
        return; // Exit if the container element doesn't exist
    }

    recommendationsContainer.innerHTML = ''; // Clear previous recommendations

    if (items.length === 0) {
        recommendationsContainer.innerHTML = '<p class="text-gray-600">No specific recommendations based on your current preferences. Explore all options below!</p>';
        return;
    }

    const list = document.createElement('div');
    list.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'; // Grid layout

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300'; // Basic card styling
        card.innerHTML = `
            <h3 class="text-xl font-semibold mb-2 text-primary">${item.name}</h3>
            <p class="text-gray-700 mb-3">${item.description}</p>
            <div class="text-sm text-gray-500">
                Tags: ${item.tags.join(', ')}
            </div>
        `;
        list.appendChild(card);
    });

    recommendationsContainer.appendChild(list);
}


// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Load user preferences
    const userPrefs = getUserPreferences();
    console.log("Loaded preferences:", userPrefs); // For debugging

    // Example: Save preferences if they don't exist (optional, for first load)
    if (!localStorage.getItem('userPreferences')) {
       saveUserPreferences(userPrefs); 
       console.log("Saved default preferences to localStorage.");
    }

    // 2. Get recommendations based on preferences
    const recommendations = getRecommendations(userPrefs);

    // 3. Display recommendations
    displayRecommendations(recommendations);

    // --- Autocomplete Setup ---
    const searchInput = document.getElementById('hero-search-input');
    const suggestionsContainer = document.getElementById('hero-suggestions');
    const searchForm = document.getElementById('hero-search-form'); // Get the form

    if (searchInput && suggestionsContainer && searchForm) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();
            
            if (query.length < 2) { // Only show suggestions for 2+ characters
                suggestionsContainer.innerHTML = '';
                suggestionsContainer.classList.add('hidden');
                return;
            }

            // Filter allItems based on the query (search name and tags)
            const filteredItems = allItems.filter(item => 
                item.name.toLowerCase().includes(query) || 
                item.tags.some(tag => tag.toLowerCase().includes(query))
            );

            suggestionsContainer.innerHTML = ''; // Clear previous suggestions

            if (filteredItems.length > 0) {
                filteredItems.slice(0, 5).forEach(item => { // Limit to 5 suggestions
                    const div = document.createElement('div');
                    div.textContent = item.name;
                    div.className = 'px-4 py-2 hover:bg-gray-100 cursor-pointer';
                    div.addEventListener('click', () => {
                        searchInput.value = item.name; // Fill input on click
                        suggestionsContainer.innerHTML = ''; // Clear suggestions
                        suggestionsContainer.classList.add('hidden');
                        // Optionally, trigger search or navigate to item page here
                        console.log("Selected:", item.name); 
                         searchForm.dispatchEvent(new Event('submit', { cancelable: true })); // Trigger form submit
                    });
                    suggestionsContainer.appendChild(div);
                });
                suggestionsContainer.classList.remove('hidden');
            } else {
                suggestionsContainer.classList.add('hidden');
            }
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (event) => {
            if (!searchForm.contains(event.target)) {
                suggestionsContainer.classList.add('hidden');
            }
        });

        // Handle form submission (e.g., redirect to a search results page)
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission
            const query = searchInput.value.trim();
            console.log(`Searching for: ${query}`); 
            suggestionsContainer.classList.add('hidden'); // Hide suggestions
            // Add your actual search logic here (e.g., redirect to search results page)
            // window.location.href = `/search?q=${encodeURIComponent(query)}`;
        });
        
    } else {
        console.warn("Search input, suggestions container, or search form not found. Autocomplete disabled.");
    }

}); 