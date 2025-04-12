document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('event-details-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalDescription = document.getElementById('modal-description');
    const modalSignificance = document.getElementById('modal-significance'); // Assuming significance is the main description for now
    const modalHistory = document.getElementById('modal-history'); // Assuming history is the main description for now

    const detailLinks = document.querySelectorAll('a[href="#"][class*="text-primary"]'); // Select links like "View Details" and "Learn More"

    if (!modal || !closeModalBtn || detailLinks.length === 0) {
        console.warn('Modal elements or detail links not found. Modal functionality might be incomplete.');
        return; // Exit if essential elements are missing
    }

    detailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent navigating to '#'

            // Find the closest common ancestor card for both timeline and featured views
            const eventCard = link.closest('.bg-white.p-6, .bg-white.rounded-2xl'); 
            
            if (!eventCard) {
                console.error('Could not find parent event card for link:', link);
                return;
            }

            // Extract data (adjust selectors based on actual card structure)
            const titleElement = eventCard.querySelector('h3, h4'); // Handles both featured (h3) and timeline (h4)
            const dateElement = eventCard.querySelector('p[class*="text-gray-600 mb-2"], div[class*="absolute top-4"]'); // Timeline date vs Featured date
            const descriptionElement = eventCard.querySelector('p[class*="text-gray-600 mb-4"]'); 
            const imgElement = eventCard.querySelector('img');

            const title = titleElement ? titleElement.textContent.trim() : 'Details unavailable';
            let date = 'Date unavailable';
            if (dateElement) {
                // Handle different date formats/locations
                if (dateElement.tagName === 'DIV') { // Featured event date (in the corner)
                    date = dateElement.textContent.trim();
                } else { // Timeline event date (paragraph)
                    date = dateElement.textContent.trim();
                }
            }
            const description = descriptionElement ? descriptionElement.textContent.trim() : 'Description unavailable';
            const imgSrc = imgElement ? imgElement.src : '';

            // Get event-specific significance and history
            let significance = '';
            let history = '';
            
            switch(title) {
                case 'Pongal Festival':
                    significance = 'Pongal is a harvest festival celebrated in Tamil Nadu, marking the end of the winter solstice and the start of the sun\'s six-month-long journey northwards. It\'s a time to give thanks to nature, the sun, and farm animals for their role in agriculture.';
                    history = 'Pongal has been celebrated for over 1000 years, with references found in ancient Tamil literature. The festival\'s name comes from the Tamil word "pongu" meaning "to boil" or "overflow," symbolizing abundance and prosperity.';
                    break;
                case 'India Art Fair':
                    significance = 'The India Art Fair is South Asia\'s leading platform for modern and contemporary art, bringing together artists, galleries, collectors, and art enthusiasts. It plays a crucial role in promoting Indian art globally and fostering cultural exchange.';
                    history = 'Founded in 2008, the India Art Fair has grown to become the country\'s premier art event. It has helped establish India\'s position in the global art market and has been instrumental in promoting contemporary Indian art internationally.';
                    break;
                case 'Holi Festival':
                    significance = 'Holi, known as the Festival of Colors, celebrates the arrival of spring and the triumph of good over evil. It\'s a time for forgiveness, renewal, and strengthening relationships through playful color throwing and festive gatherings.';
                    history = 'Holi\'s origins can be traced back to ancient Hindu scriptures, particularly the legend of Prahlad and Holika. The festival has evolved over centuries, incorporating various regional traditions and becoming a symbol of India\'s cultural diversity.';
                    break;
                case 'Baisakhi Festival':
                    significance = 'Baisakhi marks the Sikh New Year and commemorates the formation of the Khalsa Panth by Guru Gobind Singh in 1699. It\'s also a harvest festival celebrating the first day of the solar year and the beginning of the harvest season.';
                    history = 'The festival has both agricultural and religious significance. Historically, it marked the time when farmers would harvest their winter crops. The religious significance dates back to 1699 when Guru Gobind Singh established the Khalsa, a community of initiated Sikhs.';
                    break;
                case 'Raksha Bandhan':
                    significance = 'Raksha Bandhan celebrates the bond between brothers and sisters. Sisters tie a sacred thread (rakhi) on their brothers\' wrists, symbolizing their love and the brothers\' promise to protect them.';
                    history = 'The festival has roots in various historical and mythological stories, including the tale of Queen Karnavati and Emperor Humayun. It has evolved from a regional celebration to a pan-Indian festival celebrating sibling relationships.';
                    break;
                case 'Durga Puja':
                    significance = 'Durga Puja celebrates the victory of Goddess Durga over the demon Mahishasura, symbolizing the triumph of good over evil. It\'s a time for community celebration, artistic expression, and cultural performances.';
                    history = 'The festival has been celebrated for centuries, with its modern form developing in the 18th century. The grand celebrations in Kolkata, featuring elaborate pandals and idols, became popular during the British colonial period.';
                    break;
                case 'Diwali Festival':
                    significance = 'Diwali, the Festival of Lights, celebrates the victory of light over darkness and knowledge over ignorance. It marks the return of Lord Rama to Ayodhya after 14 years of exile and his victory over Ravana.';
                    history = 'The festival has been celebrated for thousands of years, with references in ancient Sanskrit texts. It has evolved to include various regional traditions and has become one of India\'s most important cultural celebrations.';
                    break;
                case 'Mumbai Film Festival':
                    significance = 'The Mumbai Film Festival is a prestigious platform for independent cinema, showcasing diverse voices and innovative storytelling from India and around the world. It plays a crucial role in promoting artistic expression and cultural exchange.';
                    history = 'Founded in 1990, the festival has grown to become one of India\'s most important film events. It has helped launch the careers of many independent filmmakers and has been instrumental in promoting alternative cinema in India.';
                    break;
                case 'Christmas in India':
                    significance = 'Christmas in India is celebrated with a unique blend of Indian and Western traditions. It\'s a time for family gatherings, feasting, and spreading joy, while also incorporating local cultural elements.';
                    history = 'Christmas was introduced to India by European colonizers in the 16th century. Over time, it has evolved to include Indian traditions, creating a unique celebration that reflects India\'s multicultural heritage.';
                    break;
                default:
                    significance = 'Significance details to be added.';
                    history = 'Historical details to be added.';
            }

            // Populate modal
            modalTitle.textContent = title;
            modalDate.textContent = date;
            modalDescription.textContent = description;
            modalSignificance.textContent = significance;
            modalHistory.textContent = history;
            modalImg.src = imgSrc;
            modalImg.alt = title;

            // Show modal with transition
            modal.classList.remove('hidden');
            modal.classList.add('flex'); // Use flex for centering
            requestAnimationFrame(() => { // Ensure display change is applied before starting transition
                 modalContent.classList.remove('scale-95', 'opacity-0');
                 modalContent.classList.add('scale-100', 'opacity-100');
            });
        });
    });

    // Close modal functionality
    const closeModal = () => {
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
        // Wait for transition to finish before hiding
        modal.addEventListener('transitionend', () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, { once: true }); // Remove listener after it runs once
        
        // Clear potential iframe src to stop video playback
        const iframe = document.getElementById('modal-video-iframe');
        if (iframe) {
            iframe.src = ""; 
        }
    };

    closeModalBtn.addEventListener('click', closeModal);

    // Optional: Close modal on clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Optional: Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // --- Add Calendar View Toggle Logic ---
    const timelineViewBtn = document.getElementById('timeline-view');
    const monthViewBtn = document.getElementById('month-view');
    const timelineContainer = document.getElementById('timeline-container');
    const monthContainer = document.getElementById('month-container'); // Assuming this exists or will be added
    const toggleIndicator = document.getElementById('toggle-indicator');

    if (timelineViewBtn && monthViewBtn && timelineContainer && monthContainer && toggleIndicator) {
        
        const setActiveView = (view) => {
            if (view === 'timeline') {
                timelineContainer.classList.remove('hidden');
                monthContainer.classList.add('hidden');
                timelineViewBtn.classList.add('active'); // Add active class for styling
                monthViewBtn.classList.remove('active');
                toggleIndicator.classList.remove('month'); // Slide indicator left
            } else { // Month view
                timelineContainer.classList.add('hidden');
                monthContainer.classList.remove('hidden');
                timelineViewBtn.classList.remove('active');
                monthViewBtn.classList.add('active'); // Add active class for styling
                toggleIndicator.classList.add('month'); // Slide indicator right
            }
        };

        // Initial state (assuming timeline is default)
        setActiveView('timeline');

        timelineViewBtn.addEventListener('click', () => setActiveView('timeline'));
        monthViewBtn.addEventListener('click', () => setActiveView('month'));

    } else {
        console.warn('Calendar view toggle elements not found. Toggle functionality disabled.');
    }

    // --- Add Category Filter Logic ---
    const categoryFilters = document.querySelectorAll('.category-filter');
    const eventCardsTimeline = timelineContainer ? timelineContainer.querySelectorAll('.relative.flex.items-center > div > .bg-white.p-6') : [];
    const eventCardsFeatured = document.querySelectorAll('#featured .bg-white.rounded-2xl'); // Assuming featured cards have this structure
    const categoryListContainer = document.getElementById('category-event-list-container');
    const categoryListTitle = document.getElementById('category-list-title');
    const categoryEventList = document.getElementById('category-event-list');
    const noEventsMessage = document.getElementById('no-category-events-message');
    const clearFilterContainer = document.getElementById('clear-filter-container');
    const clearFilterBtn = document.getElementById('clear-filter');

    // Combine all event cards (check if containers exist first)
    let allEventElements = [];
    if (timelineContainer) {
        allEventElements = allEventElements.concat(Array.from(timelineContainer.querySelectorAll('[data-category]')));
    }
     const featuredContainer = document.getElementById('featured');
    if (featuredContainer) {
         allEventElements = allEventElements.concat(Array.from(featuredContainer.querySelectorAll('[data-category]')));
    }


    if (categoryFilters.length > 0 && categoryListContainer && clearFilterBtn) {
        
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                const selectedCategory = filter.getAttribute('data-category');
                const categoryName = filter.querySelector('h3').textContent;

                // Reset active state for all filters
                categoryFilters.forEach(f => f.classList.remove('ring-2', 'ring-primary', 'ring-offset-2'));
                // Set active state for the clicked filter
                filter.classList.add('ring-2', 'ring-primary', 'ring-offset-2');

                categoryListTitle.textContent = `${categoryName}`;
                categoryEventList.innerHTML = ''; // Clear previous list

                let foundEvents = false;
                
                // Populate list with matching events (need data attributes on event cards)
                 allEventElements.forEach(card => {
                     if (card.getAttribute('data-category') === selectedCategory) {
                        const titleElement = card.querySelector('h3, h4');
                        const dateElement = card.querySelector('p[class*="text-gray-600 mb-2"], div[class*="absolute top-4"]'); // Reuse date logic
                         const title = titleElement ? titleElement.textContent.trim() : 'Unknown Event';
                         let date = 'Unknown Date';
                         if (dateElement) {
                              if (dateElement.tagName === 'DIV') { date = dateElement.textContent.trim(); } 
                              else { date = dateElement.textContent.trim(); }
                         }

                         const listItem = document.createElement('div');
                         listItem.className = 'p-2 border-b border-gray-100 flex justify-between items-center';
                         listItem.innerHTML = `
                            <span>${title}</span>
                            <span class="text-sm text-gray-500">${date}</span>
                         `;
                         categoryEventList.appendChild(listItem);
                         foundEvents = true;
                     }
                 });


                if (foundEvents) {
                    noEventsMessage.classList.add('hidden');
                } else {
                    noEventsMessage.classList.remove('hidden');
                }

                categoryListContainer.classList.remove('hidden');
                clearFilterContainer.classList.remove('hidden');
                
                // Optional: Scroll to the list
                categoryListContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        });

        clearFilterBtn.addEventListener('click', () => {
            categoryFilters.forEach(f => f.classList.remove('ring-2', 'ring-primary', 'ring-offset-2')); // Clear visual selection
            categoryListContainer.classList.add('hidden');
            clearFilterContainer.classList.add('hidden');
            categoryEventList.innerHTML = ''; // Clear list
            noEventsMessage.classList.add('hidden'); // Hide no events message
        });

    } else {
        console.warn('Category filter elements not found. Filtering functionality disabled.');
    }

    // --- Add Month Navigation Logic ---
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthDisplay = document.getElementById('current-month');
    
    if (prevMonthBtn && nextMonthBtn && currentMonthDisplay) {
        let currentDate = new Date(2025, 1); // Start Feb 2025 as per initial display

        const updateMonthDisplay = () => {
            currentMonthDisplay.textContent = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            // In a real app, you'd also fetch/filter events for this month here
        };

        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateMonthDisplay();
        });

        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateMonthDisplay();
        });

        // Initial display update
        updateMonthDisplay();
    } else {
         console.warn('Month navigation elements not found. Navigation disabled.');
    }

}); 