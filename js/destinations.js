document.addEventListener('DOMContentLoaded', () => {

    const destinationsGrid = document.getElementById('destinations-grid');
    const paginationControls = document.getElementById('pagination-controls');
    const initialMessage = destinationsGrid ? destinationsGrid.querySelector('.initial-message') : null;

    // Assume destinationsData is available globally or loaded/defined elsewhere in destinations.html
    // If it's defined later in the HTML, ensure this script runs *after* that definition.
    const allDestinations = typeof recommendations !== 'undefined' ? recommendations : []; 
    
    const ITEMS_PER_PAGE = 6; // Show 6 destinations per page
    let currentPage = 1;

    function renderDestinationCard(destination) {
        // Ensure description is not null or undefined
        const description = destination.description || 'No description available.';
        // Prepare tags (use conditions or add a dedicated tags array to your data)
        const tagsHTML = destination.conditions && destination.conditions.length > 0 
            ? `<span class="bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1 rounded-full">${destination.conditions[0]}</span>` 
            : '';
        // Prepare rating
        const ratingHTML = destination.rating 
            ? `<div class="flex items-center flex-shrink-0 ml-2">
                   <span class="text-yellow-500 mr-1"><i class="fas fa-star"></i></span>
                   <span class="text-sm font-medium text-gray-700">${destination.rating.toFixed(1)}</span>
               </div>`
            : '';
        // Prepare image URL (handle potential missing images)
        const imageSrc = destination.image || destination.imageUrl || 'images/placeholder.jpg'; // Use image or imageUrl
        const imageAlt = destination.alt || `Image of ${destination.name}`;
        // Prepare the detail page URL using the slug
        const detailPageUrl = `destination-detail.html?dest=${encodeURIComponent(destination.slug || destination.name.toLowerCase().replace(/\s+/g, '-'))}`; // Use slug or generate one

        return `
            <div id="${destination.id || destination.name.toLowerCase().replace(/\s+/g, '-')}" class="featured-destination group relative overflow-hidden rounded-xl shadow-lg">
                <img src="${imageSrc}" alt="${imageAlt}" class="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105">
                <div class="weather-badge absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center text-sm font-medium">
                    <div class="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Loading...</span>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                    <div class="mb-4">
                        <p class="text-sm font-medium mb-1 opacity-90">Did you know?</p>
                        <p class="text-sm">${destination.funFact || description.substring(0, 100) + '...'}</p>
                    </div>
                    <h3 class="text-2xl font-bold mb-1">${destination.name}</h3>
                    <div class="flex items-center text-sm">
                        <i class="fas fa-map-marker-alt mr-1.5"></i>
                        <span>${destination.location || destination.region || 'India'}</span>
                    </div>
                    <a href="javascript:void(0)" class="mt-3 inline-block text-sm font-medium hover:underline discover-more-btn" data-destination="${destination.id || destination.slug}">
                        Discover more <i class="fas fa-arrow-right ml-1"></i>
                    </a>
                </div>
            </div>
        `;
    }

    function displayPage(page) {
        if (!destinationsGrid || allDestinations.length === 0) return;

        currentPage = page;
        destinationsGrid.innerHTML = ''; // Clear previous cards

        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedItems = allDestinations.slice(startIndex, endIndex);

        if (paginatedItems.length === 0 && page === 1) {
            destinationsGrid.innerHTML = '<p class="text-center text-gray-500 md:col-span-2 lg:col-span-3">No destinations found.</p>';
        } else {
            paginatedItems.forEach(destination => {
                destinationsGrid.innerHTML += renderDestinationCard(destination);
            });
        }
        
        renderPaginationControls();
        addPlannerButtonListeners(); // Re-attach listeners after rendering
        setupDiscoverMoreButtons(); // Setup discover more buttons after rendering
    }

    function renderPaginationControls() {
        if (!paginationControls || allDestinations.length === 0) return;

        paginationControls.innerHTML = ''; // Clear existing controls
        const totalPages = Math.ceil(allDestinations.length / ITEMS_PER_PAGE);

        if (totalPages <= 1) return; // No controls needed for single page

        // Previous Button
        const prevDisabled = currentPage === 1;
        paginationControls.innerHTML += `
            <button data-page="prev" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${prevDisabled ? 'opacity-50 cursor-not-allowed' : ''}" ${prevDisabled ? 'disabled' : ''}>
                <span class="sr-only">Previous</span>
                <i class="fas fa-chevron-left text-xs"></i>
            </button>
        `;

        // Page Number Buttons
        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === currentPage ? 'text-white bg-primary border-primary hover:bg-primary/90 z-10' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700';
            paginationControls.innerHTML += `
                <button data-page="${i}" class="py-2 px-4 leading-tight border ${activeClass}">
                    ${i}
                </button>
            `;
        }

        // Next Button
        const nextDisabled = currentPage === totalPages;
        paginationControls.innerHTML += `
            <button data-page="next" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${nextDisabled ? 'opacity-50 cursor-not-allowed' : ''}" ${nextDisabled ? 'disabled' : ''}>
                <span class="sr-only">Next</span>
                <i class="fas fa-chevron-right text-xs"></i>
            </button>
        `;

        // Add event listeners to the new controls
        paginationControls.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                const pageTarget = button.getAttribute('data-page');
                let newPage = currentPage;
                if (pageTarget === 'prev') {
                    newPage = Math.max(1, currentPage - 1);
                } else if (pageTarget === 'next') {
                    newPage = Math.min(totalPages, currentPage + 1);
                } else {
                    newPage = parseInt(pageTarget, 10);
                }
                
                if (newPage !== currentPage) {
                    displayPage(newPage);
                     // Scroll to the top of the destinations section
                     const destinationsSection = document.getElementById('destinations');
                     if (destinationsSection) {
                         destinationsSection.scrollIntoView({ behavior: 'smooth' });
                     }
                }
            });
        });
    }

    // --- Add to Planner Button Logic (Simplified) ---
    function addPlannerButtonListeners() {
        const addToPlannerButtons = document.querySelectorAll('.add-to-planner-btn');
        addToPlannerButtons.forEach(button => {
            // Prevent adding multiple listeners if re-rendering
            if (button.dataset.listenerAttached === 'true') return;
            button.dataset.listenerAttached = 'true';

            button.addEventListener('click', () => {
                const destinationName = button.getAttribute('data-destination');
                if (!destinationName) return;
                let itinerary = JSON.parse(localStorage.getItem('userItinerary') || '[]');
                if (!Array.isArray(itinerary)) itinerary = [];
                const exists = itinerary.some(item => item.destination === destinationName);
                if (exists) {
                    alert(`${destinationName} is already in your itinerary.`);
                    return;
                }
                const newStop = { destination: destinationName, startDate: '', endDate: '', notes: '', tags: [] };
                itinerary.push(newStop);
                localStorage.setItem('userItinerary', JSON.stringify(itinerary));
                alert(`${destinationName} added to your itinerary!`);
                 // Optional: Visually update button state
                 button.innerHTML = '<i class="fas fa-check mr-1.5"></i> Added';
                 button.disabled = true;
                 button.classList.add('opacity-70', 'cursor-not-allowed');
                 button.classList.replace('bg-secondary','bg-green-600');
            });
        });
    }

    // --- Function to handle 'Discover more' button clicks ---
    function setupDiscoverMoreButtons() {
        const discoverMoreButtons = document.querySelectorAll('.discover-more-btn');
        discoverMoreButtons.forEach(button => {
            // Prevent adding multiple listeners if re-rendering
            if (button.dataset.listenerAttached === 'true') return;
            button.dataset.listenerAttached = 'true';
            
            button.addEventListener('click', () => {
                const destinationId = button.getAttribute('data-destination');
                if (!destinationId) return;
                
                // Navigate to the destination detail page
                window.location.href = `destination-detail.html?id=${destinationId}`;
            });
        });
    }

    // --- Initial Load ---
    if (allDestinations.length > 0) {
        displayPage(1);
        // Setup discover more buttons after page is displayed
        setupDiscoverMoreButtons();
    } else {
        if (destinationsGrid && initialMessage) {
             destinationsGrid.innerHTML = '<p class="text-center text-gray-500 md:col-span-2 lg:col-span-3">Could not load destination data.</p>';
        }
    }

    // Remove Experience Toggle Listeners as they are no longer needed
    /* 
    const toggleButtons = document.querySelectorAll('.toggle-details');
    toggleButtons.forEach(button => {
       // ... old listener code removed ...
    });
    */
}); 