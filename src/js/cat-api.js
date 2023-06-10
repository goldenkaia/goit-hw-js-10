const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_N4CuRDc3SQpxZAYfRfkiFapshcZ8KYvtusSpmH0q6XUewW3sTnE3KNOd6goG0MPE';
export function fetchBreeds() {
  return fetch(`${BASE_URL}breeds`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText || response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText || response.status);
    }
    return response.json();
  });
}
