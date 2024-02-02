// script.js
async function fetchWeather(city) {
    const apiKey = '04b1031ed8e58ea720f5797ce74a0cd5';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}

function displayWeather(data) {
    const { main, name, weather } = data;
    document.getElementById('weatherResult').innerHTML = `
        <h2 class="text-2xl font-bold">${name}</h2>
        <p>${weather[0].main} - ${weather[0].description}</p>
        <p>Temperature: ${main.temp}°C</p>
        <p>Humidity: ${main.humidity}%</p>
    `;
}

function displayError(message) {
    document.getElementById('weatherResult').innerHTML = `
        <p class="text-red-500">${message}</p>
    `;
}

document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    fetchWeather(city);
});
