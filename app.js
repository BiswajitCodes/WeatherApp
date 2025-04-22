// Function to update the current date and time
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const currentDateTime = now.toLocaleDateString('en-US', options);

    document.getElementById("current-date-time").textContent = currentDateTime;
}

// Update every second
setInterval(updateDateTime, 1000);

// Function to get the weather data
document.getElementById("get-weather").addEventListener("click", getWeather);

function getWeather() {
    const city = document.getElementById("city-input").value;
    const apiKey = "11d6cd7c91e131c509236a803424208e"; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const cityName = data.name;

            const weatherInfo = `
                <h2>Weather in ${cityName}</h2>
                <p>${weatherDescription}</p>
                <p>Temperature: ${temperature}°C</p>
            `;
            document.getElementById("weather-info").innerHTML = weatherInfo;
        })
        .catch(error => {
            document.getElementById("weather-info").innerHTML = `<p>Error: ${error.message}</p>`;
        });
}
