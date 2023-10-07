import axios from "axios";

const BASE_URL = "https://api.thecatapi.com/v1";

// Функція для отримання списку порід
export async function fetchBreeds() {
  const response = await axios.get(`${BASE_URL}/breeds`);
  return response.data;
}

// Функція для отримання інформації про кота за породою
export async function fetchCatByBreed(breedId) {
  const response = await axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`);
  return response.data;
}