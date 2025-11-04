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

    weatherInfo.innerHTML = '';
    errorDiv.textContent = '';

    buttonText.style.display = 'none';
    loadingSpinner.style.display = 'inline-block';

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
                <div class="weather-card shadow-sm">
                    <img src="${iconUrl}" alt="Weather icon">
                    <p class="fw-bold">${city}</p>
                    <p>Temperature: ${temp}°C</p>
                    <p>Feels like: ${feelsLike}°C</p>
                    <p>Description: ${description}</p>
                    <p>Humidity: ${humidity}%</p>
                </div>
            `;

            const mainWeather = data.weather[0].main;
            setWeatherBackground(mainWeather);
            setWeatherEffect(mainWeather);
        })
        .catch(error => {
            errorDiv.textContent = error.message || 'An error occurred while fetching weather data.';
        })
        .finally(() => {
            buttonText.style.display = 'inline';
            loadingSpinner.style.display = 'none';
        });
}

// Background based on weather
function setWeatherBackground(weather) {
    const body = document.body;
    body.className = ''; // Remove previous classes

    switch (weather.toLowerCase()) {
        case 'clear': body.style.background = "url('images/clear.jpg') no-repeat center center fixed"; break;
        case 'clouds': body.style.background = "url('images/clouds.jpg') no-repeat center center fixed"; break;
        case 'rain': body.style.background = "url('images/rain.jpg') no-repeat center center fixed"; break;
        case 'drizzle': body.style.background = "url('images/drizzle.jpg') no-repeat center center fixed"; break;
        case 'snow': body.style.background = "url('images/snow.jpg') no-repeat center center fixed"; break;
        case 'thunderstorm': body.style.background = "url('images/thunderstorm.jpg') no-repeat center center fixed"; break;
        case 'mist':
        case 'fog':
        case 'haze': body.style.background = "url('images/mist.jpg') no-repeat center center fixed"; break;
        default: body.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"; break;
    }
    body.style.backgroundSize = 'cover';
}

// Weather animation effects
function setWeatherEffect(weather) {
    const container = document.getElementById('effectContainer');
    container.innerHTML = ''; // Clear previous effects

    switch (weather.toLowerCase()) {
        case 'rain':
        case 'drizzle':
            for (let i = 0; i < 100; i++) {
                const drop = document.createElement('div');
                drop.className = 'rain-drop';
                drop.style.left = `${Math.random() * 100}vw`;
                drop.style.animationDuration = `${0.5 + Math.random()}s`;
                drop.style.animationDelay = `${Math.random() * 2}s`;
                container.appendChild(drop);
            }
            break;
        case 'snow':
            for (let i = 0; i < 50; i++) {
                const snow = document.createElement('div');
                snow.className = 'snowflake';
                snow.style.left = `${Math.random() * 100}vw`;
                snow.style.animationDuration = `${5 + Math.random() * 5}s`;
                snow.style.animationDelay = `${Math.random() * 5}s`;
                container.appendChild(snow);
            }
            break;
        case 'clouds':
            for (let i = 0; i < 5; i++) {
                const cloud = document.createElement('div');
                cloud.className = 'cloud';
                cloud.style.top = `${Math.random() * 30}vh`;
                cloud.style.animationDuration = `${30 + Math.random() * 20}s`;
                cloud.style.animationDelay = `${Math.random() * 10}s`;
                container.appendChild(cloud);
            }
            break;
        case 'thunderstorm':
            const thunder = document.createElement('div');
            thunder.className = 'thunder';
            container.appendChild(thunder);
            for (let i = 0; i < 80; i++) {
                const drop = document.createElement('div');
                drop.className = 'rain-drop';
                drop.style.left = `${Math.random() * 100}vw`;
                drop.style.animationDuration = `${0.5 + Math.random()}s`;
                drop.style.animationDelay = `${Math.random() * 2}s`;
                container.appendChild(drop);
            }
            break;
        default:
            container.innerHTML = '';
            break;
    }
}

// Enter key triggers search
document.getElementById('cityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') getWeather();
});

// Auto-load default city
window.addEventListener('load', getWeather);
