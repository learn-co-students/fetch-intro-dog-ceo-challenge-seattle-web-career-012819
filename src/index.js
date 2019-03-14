// console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', main);
const DOG_SERVER = "https://dog.ceo/api/breeds/image/random/4";
let DOG_RESULTS = [];

function main() {
  fetch(DOG_SERVER)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    DOG_RESULTS = json.message;
    renderDogImages(DOG_RESULTS);
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

