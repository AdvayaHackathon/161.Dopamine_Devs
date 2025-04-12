// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.onscroll = function() {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                backToTopButton.style.display = "flex";
            } else {
                backToTopButton.style.display = "none";
            }
        };

        backToTopButton.addEventListener('click', function() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        });
    }

    // Destination Search Functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically add actual search functionality
            alert('Search functionality would be implemented here!');
        });
    }

    // Interactive Map Functionality (placeholder)
    const interactiveMap = document.querySelector('.interactive-map');
    if (interactiveMap) {
        // This would be replaced with actual map integration (e.g., Google Maps API, Leaflet.js)
        console.log('Map would be initialized here');
    }

    // Destination Detail Modal
    const destinationCards = document.querySelectorAll('.destination-card button');
    if (destinationCards.length > 0) {
        destinationCards.forEach(card => {
            card.addEventListener('click', function() {
                const destinationName = this.closest('.destination-card').querySelector('h3').textContent;
                alert(`Details for ${destinationName} would be shown in a modal or new page!`);
            });
        });
    }

    // Virtual Tour Player (placeholder)
    const tourButtons = document.querySelectorAll('.virtual-tour-button');
    if (tourButtons.length > 0) {
        tourButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tourName = this.closest('.tour-card').getAttribute('data-tour-name');
                alert(`Virtual tour of ${tourName} would start playing!`);
            });
        });
    }

    // Newsletter Subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert(`Thank you for subscribing with ${emailInput.value}!`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Itinerary Builder Functionality (placeholder)
    const addToItineraryButtons = document.querySelectorAll('.add-to-itinerary');
    if (addToItineraryButtons.length > 0) {
        addToItineraryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const itemName = this.getAttribute('data-item-name');
                alert(`${itemName} has been added to your itinerary!`);
            });
        });
    }

    // --- Hero Search Autocomplete --- 
    const searchFormHero = document.getElementById('hero-search-form');
    const searchInputHero = document.getElementById('hero-search-input');
    const suggestionsContainerHero = document.getElementById('hero-suggestions');
    
    // Check if search elements exist on the page before proceeding
    if (searchFormHero && searchInputHero && suggestionsContainerHero) {
        
        // Define searchable keywords and their target URLs/actions
        // Ideally, fetch this from a central data source if possible
        const searchableDataHero = [
            { keyword: 'Taj Mahal', display: 'Taj Mahal, Agra', url: 'destinations.html#tajmahal', type: 'destination' },
            { keyword: 'Agra', display: 'Taj Mahal, Agra', url: 'destinations.html#tajmahal', type: 'destination' },
            { keyword: 'Varanasi', display: 'Varanasi', url: 'destinations.html#varanasi', type: 'destination' },
            { keyword: 'Kerala', display: 'Kerala Backwaters', url: 'destinations.html#kerala', type: 'destination' },
            { keyword: 'Backwaters', display: 'Kerala Backwaters', url: 'destinations.html#kerala', type: 'destination' },
            { keyword: 'Jaipur', display: 'Jaipur', url: 'destinations.html#jaipur', type: 'destination' },
            { keyword: 'Goa', display: 'Goa Beaches', url: 'destinations.html#goa', type: 'destination' },
            { keyword: 'Beach', display: 'Goa Beaches', url: 'destinations.html#goa', type: 'destination' },
            { keyword: 'Darjeeling', display: 'Darjeeling', url: 'destinations.html#darjeeling', type: 'destination' },
            { keyword: 'Tea', display: 'Darjeeling', url: 'destinations.html#darjeeling', type: 'destination' },
            { keyword: 'Himalayas', display: 'Himalayan Treks', url: 'experiences.html#adventure', type: 'experience' },
            { keyword: 'Trekking', display: 'Himalayan Treks', url: 'experiences.html#adventure', type: 'experience' },
            { keyword: 'Adventure', display: 'Adventure Experiences', url: 'experiences.html#adventure', type: 'experience' },
            { keyword: 'Temples', display: 'Culture & Arts', url: 'experiences.html#culture', type: 'experience' },
            { keyword: 'Culture', display: 'Culture & Arts', url: 'experiences.html#culture', type: 'experience' },
            { keyword: 'Arts', display: 'Culture & Arts', url: 'experiences.html#culture', type: 'experience' },
            { keyword: 'Food', display: 'Food & Drink', url: 'experiences.html#food', type: 'experience' },
            { keyword: 'Cuisine', display: 'Food & Drink', url: 'experiences.html#food', type: 'experience' },
            { keyword: 'Yoga', display: 'Wellness', url: 'experiences.html#wellness', type: 'experience' },
            { keyword: 'Wellness', display: 'Wellness', url: 'experiences.html#wellness', type: 'experience' },
            { keyword: 'Diwali', display: 'Diwali Festival', url: 'events.html#diwali', type: 'event' },
            { keyword: 'Holi', display: 'Holi Festival', url: 'events.html#holi', type: 'event' },
            { keyword: 'Festivals', display: 'Events & Festivals', url: 'events.html', type: 'event' },
            { keyword: 'Events', display: 'Events & Festivals', url: 'events.html', type: 'event' },
            { keyword: 'Map', display: 'Interactive Map', url: 'map.html', type: 'tool' },
            { keyword: 'Planner', display: 'Trip Planner', url: 'planner.html', type: 'tool' },
            { keyword: 'Plan trip', display: 'Trip Planner', url: 'planner.html', type: 'tool' },
            { keyword: 'Stories', display: 'Traveler Stories', url: 'stories.html', type: 'story' },
        ];

        searchInputHero.addEventListener('input', () => {
            const query = searchInputHero.value.toLowerCase().trim();
            if (query.length < 2) { // Don't show suggestions for very short queries
                suggestionsContainerHero.innerHTML = '';
                suggestionsContainerHero.classList.add('hidden');
                return;
            }

            const filteredSuggestions = searchableDataHero.filter(item => 
                item.keyword.toLowerCase().includes(query) || 
                item.display.toLowerCase().includes(query)
            );

            // Limit suggestions to avoid overly long lists
            const limitedSuggestions = filteredSuggestions.slice(0, 6); 

            displaySuggestionsHero(limitedSuggestions);
        });

        function displaySuggestionsHero(suggestions) {
            if (suggestions.length === 0) {
                suggestionsContainerHero.innerHTML = '';
                suggestionsContainerHero.classList.add('hidden');
                return;
            }

            suggestionsContainerHero.innerHTML = ''; // Clear previous suggestions
            suggestions.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('px-4', 'py-2', 'cursor-pointer', 'hover:bg-gray-100', 'text-sm', 'text-black');
                div.textContent = item.display;
                
                // Add data attribute to store the URL
                div.setAttribute('data-url', item.url); 

                div.addEventListener('mousedown', (e) => { // Use mousedown to register before blur
                    e.preventDefault(); // Prevent input blur before click registers
                    navigateToUrlHero(item.url);
                });
                suggestionsContainerHero.appendChild(div);
            });
            suggestionsContainerHero.classList.remove('hidden');
        }

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchFormHero.contains(e.target)) {
                suggestionsContainerHero.classList.add('hidden');
            }
        });
        
        // Hide suggestions when input loses focus (with a small delay to allow clicking)
        searchInputHero.addEventListener('blur', () => {
             setTimeout(() => { // Delay allows click event on suggestion to fire
                 suggestionsContainerHero.classList.add('hidden');
             }, 150); 
        });

        searchFormHero.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission
            const query = searchInputHero.value.toLowerCase().trim();
            
            // Find the best match (simple first match for now)
            const bestMatch = searchableDataHero.find(item => 
                item.keyword.toLowerCase().includes(query) || 
                item.display.toLowerCase().includes(query)
            );

            if (bestMatch) {
                navigateToUrlHero(bestMatch.url);
            } else {
                // Optional: Redirect to a generic search results page or show a message
                alert("No specific match found. Try exploring our destinations page!");
                // window.location.href = '/search?q=' + encodeURIComponent(query);
            }
        });

        function navigateToUrlHero(url) {
            if (url) {
                window.location.href = url;
            }
        }
    }
}); 