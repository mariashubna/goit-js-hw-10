import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_1FrID8A3d3SHqNZpm42jloqifB6oP9agX2Mxj1n6cccy5ravdHAJWtea0u7N9FEX';

let page = 1;
const BASE_URL = 'https://api.thecatapi.com';
const API_KEY =
  'live_1FrID8A3d3SHqNZpm42jloqifB6oP9agX2Mxj1n6cccy5ravdHAJWtea0u7N9FEX';
const END_POINT = 'v1/breeds';


export function fetchBreeds(page = 1) {

  const params = {
    api_key: API_KEY,
    page,
  };

  return axios.get(`${BASE_URL}/${END_POINT}?${params}`).then(resp => {
    if (resp.status < 200 || resp.status >= 300) {
      throw new Error(`Fetch error with ${resp.status}: ${resp.statusText}`);
    }
    return resp.data;
  });
}


export function fetchCatByBreed(breedId) {
      
    const params = {
      breed_ids: breedId,
    };
  
    return axios.get(`${BASE_URL}/${END_POINT}?${params}`).then((resp) => {
      if (resp.status < 200 || resp.status >= 300) {
        throw new Error(`Fetch error with ${resp.status}: ${resp.statusText}`);
      }
      return resp.data;
    });
  }
