import axios from "axios";
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

const slimSelect = new SlimSelect({
  select: breedSelect
});


axios.defaults.headers.common["x-api-key"] = "live_1FrID8A3d3SHqNZpm42jloqifB6oP9agX2Mxj1n6cccy5ravdHAJWtea0u7N9FEX";

function createCatMarkup(catData) {
  return catData
    .map(({ url, breeds }) => `
        <img src="${url}" alt="${breeds[0].name}"  >
        <div class="cat-card">
          <h2>${breeds[0].name}</h2>
          <p>${breeds[0].description}</p>
          <p>Temperament: ${breeds[0].temperament}</p>
        </div>
    `)
    .join("");
}

function showError(message) {
  error.textContent = message;
  error.style.display = "block";
  Notiflix.Notify.failure(message);
}

function clearCatInfo() {
  catInfo.innerHTML = "";
}

breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    clearCatInfo();
    loader.style.display = "block";
    error.style.display = "none";

    fetchCatByBreed(selectedBreedId)
      .then((catData) => {
        catInfo.innerHTML = createCatMarkup(catData);
      })
      .catch(() => {
        showError("Oops! Something went wrong!");
      })
      .finally(() => {
        loader.style.display = "none";
      });
  }
});

window.addEventListener("load", () => {
  loader.style.display = "block";
  error.style.display = "none";

  fetchBreeds()
    .then((breeds) => {
      breeds.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(() => {
      showError("Oops! Something went wrong!");
    })
    .finally(() => {
      loader.style.display = "none";
    });
});

