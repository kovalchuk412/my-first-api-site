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
