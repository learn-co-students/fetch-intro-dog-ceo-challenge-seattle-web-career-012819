console.log('%c HI', 'color: firebrick');

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';


var IMAGES = []
var BREEDS = []

window.addEventListener('load', loadRandomDogs);
window.addEventListener('load', loadDogBreeds);


function loadRandomDogs() {

  fetch(imgUrl)
  .then(result => {
    return result.json()
  })
  .then(json => {
    IMAGES = json
    showDoges(IMAGES)
  })
}



function showDoges(image_array) {
  const imgDiv = document.getElementById('dog-image-container');
  //console.log('images', image_array)
  for(image of image_array.message) {
    //console.log('images', image)
    let img = document.createElement('img');
    img.src = image;
    imgDiv.appendChild(img);
  };
}

function loadDogBreeds() {

  fetch(breedUrl)
  .then(result => {
    return result.json()
  })
  .then(json => {
    BREEDS = json
    listBreeds(BREEDS)
  })
}

function listBreeds(breeds) {

  const ul = document.getElementById('dog-breeds');
  ul.innerHTML = '';
  //console.log('breeds', breeds)
  for(breed in breeds.message) {
    let li = document.createElement('li');
    li.textContent = breed
    li.addEventListener('click', function() {
      li.style.color = 'lime'
    });
    ul.appendChild(li)
  }

  const selectBox = document.getElementById('breed-dropdown');
  selectBox.addEventListener('change', searchBreeds);
}

function searchBreeds(event) {
  //filteredBreeds = {message: {breed => [], breed => []}}
  filteredBreeds = {}
  for(breed in BREEDS.message) {
    if (breed.startsWith(event.target.value)) {
      //dog = {[breed]: []}
      filteredBreeds[breed] = ''
    }
  }
  let dogs = {message: filteredBreeds}
  console.log(dogs)
  listBreeds(dogs)
}
