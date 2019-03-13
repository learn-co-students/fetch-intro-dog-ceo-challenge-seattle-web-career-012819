window.addEventListener('load', main);

const IMAGES_URL = 'https://dog.ceo/api/breeds/image/random/4';
const BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';
let IMAGES = [];
let BREEDS = [];

function main() {
	fetch(IMAGES_URL)
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			IMAGES = json.message;
		})
		.then(function() {
			renderDogs();
		})
		.then(function() {});
	fetch(BREEDS_URL)
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			BREEDS = Object.keys(json.message);
		})
		.then(function() {
			renderBreeds();
		});

	const select = document.getElementById('breed-dropdown');
	select.addEventListener('change', selectBreed);
}

function renderDogs() {
	let imgContainer = document.getElementById('dog-image-container');

	for (image of IMAGES) {
		imageElement = document.createElement('img');
		imgContainer.appendChild(imageElement);
		imageElement.src = image;
	}
}

function renderBreeds(breeds) {
	let list = document.getElementById('dog-breeds');

	for (breed of BREEDS) {
		let li = document.createElement('li');
		list.appendChild(li);
		li.innerText = breed;
		li.addEventListener('click', () => {
			li.style.color = 'blue';
		});
		li.id = breed[0];
	}
}

function selectBreed(event) {
	let breedLetter = event.target.value;
	let breeds = document.getElementsByTagName('li');
	if (breedLetter === 'none') {
		for (breed of breeds) {
			breed.style.display = '';
		}
	} else {
		for (let i = breeds.length - 1; i >= 0; i--) {
			let breed = breeds[i];
			let identifier = breed.id;
			if (identifier != breedLetter) {
				breed.style.display = 'none';
			} else {
				breed.style.display = '';
			}
		}
	}
}
