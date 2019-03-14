document.addEventListener('DOMContentLoaded', loadDogImages);
document.addEventListener('DOMContentLoaded', loadDogBreeds);

const dogImages = "https://dog.ceo/api/breeds/image/random/4";
let dogResults = [];

function loadDogImages() {
  fetch(dogImages)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    const dogResults = json.message;
    renderDogImages(dogResults);
  });
}

function renderDogImages(dogImageUrls) {
  const dogDiv = document.getElementById("dog-image-container");
  for (let url of dogImageUrls) {
    let img = document.createElement('img');
    img.src = url;
    dogDiv.appendChild(img);
  }
}

const breedUrl = 'https://dog.ceo/api/breeds/list/all';
let dogBreeds = [];

function loadDogBreeds() {
  fetch(breedUrl)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    const dogBreeds = Object.keys(json.message);
    renderDogBreeds(dogBreeds);
  });
}

function renderDogBreeds(breeds) {
  for (let breed of breeds) {
    const ul = document.getElementById('dog-breeds');
    const li = document.createElement('li');
    li.textContent = breed;
    ul.appendChild(li);
  }
}