console.log('%c HI', 'color: firebrick')

window.addEventListener('load', main);

function main() {
  addDogImages();
  addDogBreeds();
  filterDogBreed();
}

function addDogImages() {
  const dogImageContainer = document.getElementById("dog-image-container");
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
    .then(response => {
      return response.json();
    })
    .then(json => {                  
      json.message.forEach(img => {
        const image = document.createElement("img")
        image.src = img;
        // console.log(image);
        dogImageContainer.appendChild(image);
      });
    });
}

function addDogBreeds() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all';
  const dogBreedContainer = document.getElementById("dog-breeds");
  changeColorOnClick(dogBreedContainer);
  fetch(breedUrl)
    .then(response => {
      return response.json();
    })
    .then(json => {
      Object.keys(json.message).forEach(breedName => {
        dogBreedContainer.appendChild(createLi(breedName));
        if (json.message[breedName].length) {
          json.message[breedName].forEach(subBreed => {
            dogBreedContainer.appendChild(
                createLi(`${subBreed} ${breedName}`)
            );
          })
        }
      })
    }
  );
}

function createLi(contents) {
  const li = document.createElement("li");
  li.innerText = contents;
  return li;
}

function changeColorOnClick(element) {
  element.addEventListener('click', event => {
    let style = event.target.style;
    if (style.color === "blue") style.color = "black";
    else style.color = "blue";
  })
}

function filterDogBreed() {
  const select = document.getElementById("breed-dropdown");
  const dogBreedContainer = document.getElementById("dog-breeds");
  select.addEventListener('change', e => {
    select.value;
    const dogBreeds = Array.prototype.slice.call(dogBreedContainer.children);
    dogBreeds.forEach(dogLi => {
      if (dogLi.innerText.startsWith(select.value)) {
        dogLi.style.display = "block";
      } else {
        dogLi.style.display = "none";
      }
    })

  });
}