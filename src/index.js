console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

let IMAGERESULTS = []
let BREEDRESULTS = []

const dogImageContainer = document.getElementById("dog-image-container")
const dogBreedContainier = document.getElementById("dog-breeds")
let selection = document.getElementById('breed-dropdown')

function fetchImages() {
  fetch(imgUrl)
  .then(result => {
    return result.json()
  })
  .then(json => {
    IMAGERESULTS = json
    renderImages(IMAGERESULTS)
  })
}
function fetchBreeds() {
  fetch(breedUrl)
  .then(breeds => {
    return breeds.json()
  })
  .then(json => {
    BREEDRESULTS = json
    renderBreeds(BREEDRESULTS)
  })
}

function renderImages(files){
  for (file of files.message) {
    let img = document.createElement('img')
    img.setAttribute('src', file)
    dogImageContainer.appendChild(img)
  }
}
function renderBreeds(files){
  for (file in files.message) {
    if (files.message[file].length === 0){
      let li = document.createElement('li')
      li.textContent = `${file}`
      li.setAttribute('onclick', "changeColor(this, 'orange')")
      li.setAttribute('class', file[0])
      dogBreedContainier.appendChild(li)
    } else {
      for (breed of files.message[file]){
        let li = document.createElement('li')
        li.textContent = `${file} - ${breed}`
        li.setAttribute('onclick', "changeColor(this, 'orange')")
        li.setAttribute('class', file[0])
        dogBreedContainier.appendChild(li)
      }
  }
  }
}

function changeColor(element, color){
  element.style.color = color
}

selection.addEventListener('change', filterResults)

fetchImages()
fetchBreeds()

function filterResults(){
  let tags = document.getElementsByTagName('li')
  if (selection.value == "none"){
    for (tag of tags){
        tag.style.display = ''
    }
  } else {
  for (tag of tags){
      tag.style.display = ''
  }
  for (tag of tags){
    if (tag.attributes.class.value != selection.value){
      tag.style.display = 'none'
    }
  }
  }
}
