import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import './sass/index.scss';
const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

function addMarkup(el, markup) {
  el.innerHTML = markup;
}

window.addEventListener('load', onLoad);
function onLoad() {
  fetchBreeds()
    .then(response => {
      let markup = createSelectOption(response);
      addMarkup(selectEl, markup);
    })
    .catch(error => {
      console.log(error.message);
      toggleHidden(errorEl, 'remove');
    })
    .finally(() => {
      toggleHidden(loaderEl);
    });
}
function createSelectOption(breeds = []) {
  return breeds
    .map(({ name, id }) => {
      return ` <option value="${id}">${name}</option>`;
    })
    .join('');
}
function createMarkup({ url, breeds: [{ name, description, temperament }] }) {
  const markup = `
  <div>
      <img src="${url}" alt="cat" width="350">
  </div>
  <div>
      <div>
          <h1 class="title">${name}</h1>
          <p>${description}</p>
      </div>
      <p>${temperament}</p>
  </div>`;
  return markup;
}

selectEl.addEventListener('change', onChange);
function onChange(evt) {
  const value = evt.target.value;
  toggleHidden(loaderEl, 'remove');
  toggleHidden(errorEl);
  fetchCatByBreed(value)
    .then(response => {
      const markup = createMarkup(response[0]);
      addMarkup(catInfoEl, markup);
    })
    .catch(error => {
      console.log(error);
      toggleHidden(errorEl, 'remove');
    })
    .finally(() => {
      toggleHidden(loaderEl);
    });
}
function toggleHidden(el, method = 'add') {
  el.classList[method]('hidden');
}
