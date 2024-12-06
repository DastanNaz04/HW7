const url = "https://swapi.dev/api/people/"; // API для персонажей
const imageBaseUrl = "https://starwars-visualguide.com/assets/img/characters/"; // Базовый URL для изображений

let heroImage = document.getElementById("hero-avatar");
let heroTitle = document.getElementById("hero-title");
let heroDescription = document.getElementById("hero-description");
let heroGender = document.getElementById("hero-gender");
let heroRace = document.getElementById("hero-race");
let heroHeight = document.getElementById("hero-height");

async function fetchStarWarsCharacters() {
    try {
        const response = await fetch(url); // Запрос к API SWAPI
        const data = await response.json();

        const characters = data.results; // Массив персонажей
        const randomIndex = Math.floor(Math.random() * characters.length); // Случайный индекс
        const character = characters[randomIndex];

        // Извлечение ID персонажа (индекс + 1 соответствует ID в базе изображений)
        const characterId = randomIndex + 1;

        // Обновляем информацию о персонаже
        heroTitle.innerText = character.name;
        heroDescription.innerText = `Birth Year: ${character.birth_year}`;
        heroGender.innerText = `Gender: ${character.gender}`;
        heroRace.innerText = `Eye Color: ${character.eye_color}`;
        heroHeight.innerText = `Height: ${character.height} cm`;

        // Устанавливаем изображение
        heroImage.setAttribute("src", `${imageBaseUrl}${characterId}.jpg`);
        heroImage.onerror = () => {
            // Если фото отсутствует, показываем заглушку
            heroImage.setAttribute("src", "https://via.placeholder.com/400x400?text=No+Image");
        };
    } catch (error) {
        console.error("Ошибка при загрузке персонажей:", error);
    }
}

// Загружаем персонажа при загрузке страницы
document.addEventListener("DOMContentLoaded", fetchStarWarsCharacters);
