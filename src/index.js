import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

// Встановлюємо заголовок для HTTP-запитів
axios.defaults.headers.common["x-api-key"] = "твій ключ";

// Функція для відображення помилки
function showError(message) {
  error.textContent = message;
  error.style.display = "block";
}

// Очищення вмісту div.cat-info
function clearCatInfo() {
  catInfo.innerHTML = "";
}

// Обробник події вибору породи
breedSelect.addEventListener("change", async () => {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    clearCatInfo();
    loader.style.display = "block";
    error.style.display = "none";

    try {
      const catData = await fetchCatByBreed(selectedBreedId);

      // Відображення зображення та інформації про кота
      const catImage = document.createElement("img");
      catImage.src = catData[0].url;

      const catName = document.createElement("h2");
      catName.textContent = catData[0].breeds[0].name;

      const catDescription = document.createElement("p");
      catDescription.textContent = catData[0].breeds[0].description;

      const catTemperament = document.createElement("p");
      catTemperament.textContent = `Temperament: ${catData[0].breeds[0].temperament}`;

      catInfo.appendChild(catImage);
      catInfo.appendChild(catName);
      catInfo.appendChild(catDescription);
      catInfo.appendChild(catTemperament);
    } catch (e) {
      showError("Oops! Something went wrong!");
    } finally {
      loader.style.display = "none";
    }
  }
});

// Завантаження порід під час завантаження сторінки
window.addEventListener("load", async () => {
  loader.style.display = "block";
  error.style.display = "none";

  try {
    const breeds = await fetchBreeds();

    // Заповнюємо вибір порід опціями
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (e) {
    showError("Oops! Something went wrong!");
  } finally {
    loader.style.display = "none";
  }
});