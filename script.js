// 1. Робимо запит до API
fetch("https://jsonplaceholder.typicode.com/users")

  // 2. Отримуємо відповідь та перетворюємо в JSON
  .then(response => response.json())

  // 3. Обробляємо дані
  .then(users => {
    console.log("Отримані дані:", users);

    const container = document.getElementById("users-container");
    container.innerHTML = "<h2>Список користувачів:</h2>";

    // 4. Виводимо кожного користувача
    users.forEach(user => {
      const item = document.createElement("p");
      item.textContent = `${user.id}. ${user.name} — ${user.email}`;
      container.appendChild(item);
    });
  })

  // 5. Обробка помилок
  .catch(error => {
    console.error("Сталася помилка:", error);
    document.getElementById("users-container").textContent =
      "Не вдалося завантажити дані 😢";
  });
// 1. Отримуємо елементи
const cityInput = document.getElementById("city-input");
const getWeatherBtn = document.getElementById("get-weather");
const weatherResult = document.getElementById("weather-result");

// 2. Вішаємо обробник на кнопку
getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (!city) {
    weatherResult.textContent = "Введіть назву міста!";
    return;
  }

  fetchWeather(city);
});

// 3. Функція для отримання погоди
function fetchWeather(city) {
  const API_KEY = "b14a1ec74a0543ca902f5d8dd3d64d21"; // вставиш свій ключ
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=uk&appid=${API_KEY}`;

  weatherResult.textContent = "Завантажую...";

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Місто не знайдено");
      }
      return response.json();
    })
    .then(data => {
      renderWeather(data);
    })
    .catch(error => {
      weatherResult.textContent = "Помилка: " + error.message;
    });
}

// 4. Функція для відображення погоди
function renderWeather(data) {
  weatherResult.innerHTML = `
    <h3>${data.name}</h3>
    <p>Температура: ${data.main.temp}°C</p>
    <p>Відчувається як: ${data.main.feels_like}°C</p>
    <p>Погода: ${data.weather[0].description}</p>
  `;
}
