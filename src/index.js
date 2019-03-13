console.log('%c HI', 'color: firebrick');

window.addEventListener('load', main);

const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
const breedUrl = 'https://dog.ceo/api/breeds/list/all';
const selectBreed = document.getElementById('breed-dropdown');

let dogImages = [];
let dogBreeds = [];
let ALL_BREEDS = [];

function main() {
  fetch(imgUrl)
  .then(result => {
    return result.json();
  })
  .then(json => {
    dogImages = json.message;
    renderDogs(dogImages);
  });

  fetch(breedUrl)
  .then(result => {
    return result.json();
  })
  .then(json => {
    //console.log(json);
    dogBreeds = json.message;
    ALL_BREEDS = dogBreeds;
    renderBreeds(dogBreeds);
  });
}

function renderDogs(dogs) {
  const dogImageContainer = document.getElementById("dog-image-container");

  dogs.forEach(dogItem => {
    let dogFace = document.createElement('img');
    dogFace.src = dogItem;
    dogImageContainer.appendChild(dogFace);
  })
};

function renderBreeds(breeds) {
  const dogBreedsList = document.getElementById('dog-breeds');
  // if we have already rendered anything in the list,
  // remove it all first
  while (dogBreedsList.firstChild) {
    dogBreedsList.removeChild(dogBreedsList.firstChild);
  }

  // now we can render to the list
  for(breed in breeds) {
    let breedFace = document.createElement('li');
    breedFace.textContent = breed;
    dogBreedsList.appendChild(breedFace);
    breedFace.addEventListener('click',function(event) {
      event.target.style.color = 'green';
    });
  }
};

function selectAlphabadog(event) {
  let selectOption = event.target.value;
  // create an empty object
  let filtered = {};

  for (alphaBreed in ALL_BREEDS) {
    // extract first letter of each "alphaBreed" key
    let firstLetter = alphaBreed.substring(0, 1).toLowerCase();
    // if we find a match with the filter selection dropdown
    if (firstLetter === selectOption) {
      // create a new property named by the alphaBreed key
      // store the item in ALL-BREEDS that has the same key value.
      filtered[alphaBreed] = ALL_BREEDS[alphaBreed];
    }
  }
  // re-render the list
  renderBreeds(filtered);
}

selectBreed.addEventListener('change', selectAlphabadog);