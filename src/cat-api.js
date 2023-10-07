import axios from "axios";


const BASE_URL = "https://api.thecatapi.com/v1";

export function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}