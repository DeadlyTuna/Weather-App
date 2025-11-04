// Your OpenWeatherMap API key
const API_KEY = 'ed4d6f32322d8ceac980f5acba269813';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const weatherInfo = document.getElementById('weatherInfo');
    const errorDiv = document.getElementById('error');
    const buttonText = document.getElementById('buttonText');
    const loadingSpinner = document.getElementById('loadingSpinner');

    if (!city) {
        errorDiv.textContent = 'Please enter a city name.';
        weatherInfo.innerHTML = '';
        return;
    }

    // Clear previous results
    weatherInfo.innerHTML = '';
    errorDiv.textContent = '';

    // Show loading state
    buttonText.style.display = 'none';
    loadingSpinner.style.display = 'inline';

    fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const temp = Math.round(data.main.temp);
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const feelsLike = Math.round(data.main.feels_like);
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            weatherInfo.innerHTML = `
                <div class="weather-card">
                    <img src="${iconUrl}" alt="Weather icon">
                    <p><strong>${city}</strong></p>
                    <p>Temperature: ${temp}°C</p>
                    <p>Feels like: ${feelsLike}°C</p>
                    <p>Description: ${description}</p>
                    <p>Humidity: ${humidity}%</p>
                </div>
            `;
        })
        .catch(error => {
            errorDiv.textContent = error.message || 'An error occurred while fetching weather data.';
        })
        .finally(() => {
            // Hide loading state
            buttonText.style.display = 'inline';
            loadingSpinner.style.display = 'none';
        });
}

// Allow Enter key to trigger search
document.getElementById('cityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

// Auto-load on start
window.addEventListener('load', getWeather);