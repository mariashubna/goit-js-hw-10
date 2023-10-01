import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select'

new SlimSelect({
  select: '#selectElement'
})

const refs = {
    select: document.querySelector(".breed-select"),
    catInfo: document.querySelector(".cat-info"),
    loader: document.querySelector(".loader"),
    error: document.querySelector(".error"),
  };



  fetchBreeds()
  
  .then((breeds) => {
      
    const breedOptions = breeds.map((breed) => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      return option;
    });
  
    breedOptions.forEach((option) => {
     refs.select.appendChild(option);
    });
  })

  .catch((error) => {
    
    hideLoader (refs.error);
  });
 
  
  
  function hideLoader (e) {
    refs.loader.style.display = "none";
    e.style.display = "block";
  }
  
  function showError(error) {
    refs.error.style.display = "block";
    console.error(error);
  }
  
  
  refs.select.addEventListener('change', () => {
    const selectedId = refs.select.value;
  
    if (selectedId) {
      
      refs.loader.style.display = "block";
  
      fetchCatByBreed(selectedId)
        .then((catData) => {         
          hideLoader(refs.catInfo);  
          const cat = catData[0];
          refs.catInfo.innerHTML = `
            <h2>${cat.breeds[0].name}</h2>
            <p>${cat.breeds[0].description}</p>
            <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
            <img src="${cat.url}" alt="${cat.breeds[0].name}" />
          `;
        })
        .catch((error) => {
          hideLoader(refs.error);
          console.error(error);
        });
    } else {
      refs.catInfo.innerHTML = '';
    }
  });