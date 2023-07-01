import axios from 'axios';
import Notiflix from 'notiflix';
//API Vars

const API_KEY =
  'live_1Lquccm5yK9ReXFRYZ2Xivx8NrOsYEwaGsZs5PtfUFz0iq4d77080CJoC0uKh8cd';
const CAT_BREEDS_API = 'https://api.thecatapi.com/v1/breeds';
const SEARCH_CAT_API = 'https://api.thecatapi.com/v1/images/search';
axios.defaults.headers.common['x-api-key'] = API_KEY;

//HTML Elements

const breedSelect = document.querySelector('.breed-select');
const errorMessage = document.querySelector('.error');
const catInfoContainer = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
errorMessage.style.visibility = 'hidden';
loader.style.visibility = 'hidden';

//
function fetchBreeds() {
  loader.style.visibility = 'visible';
  breedSelect.style.visibility = 'hidden';
  return axios
    .get(CAT_BREEDS_API)
    .then(response => {
      const breedsList = response.data;
      const markup = getListEl(breedsList);

      breedSelect.insertAdjacentHTML('afterbegin', markup);
      loader.style.visibility = 'hidden';
      breedSelect.style.visibility = 'visible';
    })
    .catch(err => onErorr(err));
}
//

function fetchCatByBreed() {
  loader.style.visibility = 'visible';
  catInfoContainer.style.visibility = 'hidden';
  const breedId = event.target.value;
  return axios
    .get(SEARCH_CAT_API, {
      params: {
        breed_ids: breedId,
      },
    })
    .then(result => {
      const breed = result.data[0];
      const markup = getCat(breed);
      catInfoContainer.insertAdjacentHTML('afterbegin', markup);
      loader.style.visibility = 'hidden';
      catInfoContainer.style.visibility = 'visible';
    })
    .catch(err => onErorr(err));
}
//
function onErorr(err) {
  console.error(err.state);
  errorMessage.style.visibility = 'visible';
  breedSelect.style.visibility = 'hidden';
  catInfoContainer.style.visibility = 'hidden';
  loader.style.visibility = 'hidden';
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
//Create selector markup
function getListEl(array) {
  const markup = array.map(el => {
    return ` <option value=${el.id}>${el.name}</option>`;
  });
  return markup;
}
//Create element from selector
function getCat(obj) {
  const CatImg = obj.url;
  const markup = obj.breeds
    .map(cat => {
      return ` <h1>${cat.name}</h1>
          <img src=${CatImg} alt=${cat.name} width='500'/>
        <p><b>Cat description</b><br>${cat.description}</p>
        <p><b>Cat temperament</b><br>${cat.temperament}</p>`;
    })
    .join('');
  return markup;
}

export { fetchBreeds, fetchCatByBreed };
