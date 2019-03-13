
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = "https://dog.ceo/api/breeds/list/all"
document.addEventListener("DOMContentLoaded", loadImage);
// const dogImageContainer = document.getElementById("dog-image-container");
const dogBreedContainer = document.getElementById("dog-breeds")

function loadImage(){
  fetch(imgUrl)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    json.message.forEach((img) =>{
      let imgNode = document.createElement('img');
      document.getElementById("dog-image-container").appendChild(imgNode);
      imgNode.src = img;
    });
  });

  fetch(breedUrl)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json)
    DOG_BREEDS = Object.keys(json.message);
    renderBreeds(DOG_BREEDS)
  })

  function randColor(){
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    return `rgb(${r},${g},${b})`;
  }

  document.getElementById("breed-dropdown").addEventListener("change", ()=>{
    let letter = document.getElementById("breed-dropdown").value;
    const filtered = []
    DOG_BREEDS.forEach((breed) =>{
      if(breed.toLowerCase().startsWith(letter)){
        filtered.push(breed)
      }
    });
    renderBreeds(filtered);
  });

  function renderBreeds(breeds){
    document.getElementById("dog-breeds").innerHTML = '';
    breeds.forEach((breed) =>{
      let li = document.createElement('li');
      document.getElementById("dog-breeds").appendChild(li);
      li.textContent = breed;
      li.addEventListener("mouseover",() =>{
        li.style.color = randColor();
      });
    });
  }
}
