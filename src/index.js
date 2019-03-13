window.addEventListener('load', main1);

const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

let breedResults = [];
let imgResults = [];

console.log('working');

function main1() {
    console.log('inside main');
    fetch(imgUrl)
        .then((result) => {
            return result.json();
        })
        .then((json) => {
            imgResults = json;
            console.log('inside then json');
            renderbreeds(imgResults.message);
        });

    console.log('inside main 2');
    fetch(breedUrl)
        .then((result) => {
            return result.json();
        })
        .then((json) => {
            breedResults = json;
            let allBreedKeys = [];
            allBreedKeys = Object.keys(breedResults.message);
            renderBreeds(allBreedKeys);
        });

    const letter = document.getElementById('breed-dropdown');
    letter.addEventListener('change', breedDropdownChoice);
}

function renderbreeds(breeds) {
    const imageContainer = document.getElementById('dog-image-container');
    for (image of breeds) {
        let li = document.createElement('li');
        let img = document.createElement('img');
        img.src = image;
        li.append(img);
        imageContainer.append(li);
    }
}

function renderBreeds(breeds) {
    const breedContainer = document.getElementById('dog-breeds');
    for (breed of breeds) {
        let li = document.createElement('li');
        li.append(breed);
        breedContainer.append(li);
        li.addEventListener('click', colorChange);
    }
}

function breedDropdownChoice(ev) {
    let breedContainer = document.getElementById('dog-breeds');
    console.log(`selected`, ev);
    let breedLetter = ev.target.value;
    for (let li of breedContainer.getElementsByTagName('li')) {
        console.log(li);
        if (li.textContent[0] != breedLetter) {
            li.style.display = 'none';
        }
    }
}

function colorChange(ev) {
    ev.currentTarget.style.color = 'purple';
}
