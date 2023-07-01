import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
fetchBreeds();
breedSelect.addEventListener('change', fetchCatByBreed);
