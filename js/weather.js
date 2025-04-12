// Weather API functionality for destinations page
const WEATHER_API_KEY = '6276a7ba809c2e3dca9a9cae4e5a401d'; // OpenWeatherMap API key
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Weather data for major destinations
const destinationCoordinates = {
    'tajmahal': { lat: 27.1751, lon: 78.0421, name: 'Agra' },
    'varanasi': { lat: 25.3176, lon: 83.0130, name: 'Varanasi' },
    'jaipur': { lat: 26.9124, lon: 75.7873, name: 'Jaipur' },
    'kerala': { lat: 10.8505, lon: 76.2711, name: 'Kerala' },
    'goa': { lat: 15.2993, lon: 74.1240, name: 'Goa' },
    'darjeeling': { lat: 27.0410, lon: 88.2663, name: 'Darjeeling' },
    'hampi': { lat: 15.3350, lon: 76.4600, name: 'Hampi' },
    'mysore': { lat: 12.2958, lon: 76.6394, name: 'Mysore' },
    'orchha': { lat: 25.3515, lon: 78.6403, name: 'Orchha' },
    'gokarna': { lat: 14.5479, lon: 74.3188, name: 'Gokarna' },
    'gurezvalley': { lat: 34.6333, lon: 74.8500, name: 'Gurez Valley' }
};

// Function to fetch weather data for a specific destination
async function fetchWeatherData(destinationId) {
    const destination = destinationCoordinates[destinationId];
    
    if (!destination) return null;
    
    try {
        const response = await fetch(`${WEATHER_API_BASE_URL}?lat=${destination.lat}&lon=${destination.lon}&units=metric&appid=${WEATHER_API_KEY}`);
        if (!response.ok) throw new Error('Weather data fetch failed');
        
        const data = await response.json();
        return {
            temp: Math.round(data.main.temp),
            tempMin: Math.round(data.main.temp_min),
            tempMax: Math.round(data.main.temp_max),
            condition: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            cityName: data.name
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

// Function to display weather in the featured destinations section
function displayFeaturedWeather() {
    const featuredDestinations = document.querySelectorAll('.featured-destination');
    
    featuredDestinations.forEach(destination => {
        const destinationId = destination.querySelector('.discover-more-btn')?.dataset.destination;
        if (!destinationId) return;
        
        // Create weather element if it doesn't exist
        let weatherElement = destination.querySelector('.weather-badge');
        if (!weatherElement) {
            weatherElement = document.createElement('div');
            weatherElement.className = 'weather-badge absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center text-sm font-medium';
            weatherElement.innerHTML = '<div class="loading-spinner mr-2"></div> Loading weather...';
            destination.querySelector('.relative').appendChild(weatherElement);
        }
        
        // Fetch and display weather
        fetchWeatherData(destinationId).then(weatherData => {
            if (weatherData) {
                weatherElement.innerHTML = `
                    <img src="https://openweathermap.org/img/wn/${weatherData.icon}.png" alt="${weatherData.description}" class="w-8 h-8 -ml-2 -my-1">
                    <span>${weatherData.temp}°C</span>
                `;
            } else {
                weatherElement.remove();
            }
        });
    });
}

// Function to update weather in the destination detail modal
function updateModalWeather(destinationId) {
    const weatherContainer = document.getElementById('modal-weather');
    if (!weatherContainer) return;
    
    weatherContainer.innerHTML = '<div class="loading-spinner mr-2"></div> Loading weather...';
    
    fetchWeatherData(destinationId).then(weatherData => {
        if (weatherData) {
            weatherContainer.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <img src="https://openweathermap.org/img/wn/${weatherData.icon}@2x.png" alt="${weatherData.description}" class="w-16 h-16 -ml-2">
                        <div>
                            <p class="text-3xl font-bold">${weatherData.temp}°C</p>
                            <p class="text-sm text-gray-600">${weatherData.description}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-gray-700">Humidity: ${weatherData.humidity}%</p>
                        <p class="text-sm text-gray-700">Wind: ${weatherData.windSpeed} m/s</p>
                    </div>
                </div>
                <div class="mt-2 text-sm text-gray-500">
                    <p>Min: ${weatherData.tempMin}°C | Max: ${weatherData.tempMax}°C</p>
                </div>
            `;
        } else {
            weatherContainer.innerHTML = '<p class="text-gray-500">Weather data unavailable</p>';
        }
    });
}

// Initialize weather functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Display weather for featured destinations
    displayFeaturedWeather();
    
    // Update modal weather when a destination is clicked
    const discoverMoreBtns = document.querySelectorAll('.discover-more-btn');
    discoverMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const destinationId = this.getAttribute('data-destination');
            // Wait for modal content to be populated
            setTimeout(() => updateModalWeather(destinationId), 100);
        });
    });
});
