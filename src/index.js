console.log('%c HI', 'color: firebrick');
window.addEventListener('load', main);
let IMAGES = [];
let BREEDS = {};

function main() {
	fetch('https://dog.ceo/api/breeds/image/random/4')
		.then(function(response) {
			return response.json();
		})
		.then(function(json) {
			IMAGES = json.message;
		})
		.then(function() {
			displayImages();
		})
		.then(function() {
			fetch('https://dog.ceo/api/breeds/list/all')
				.then(function(response) {
					return response.json();
				})
				.then(function(json) {
					BREEDS = Object.keys(json.message);
				})
				.then(function() {
					addBreeds();
				});
		});
	const select = document.getElementById('breed-dropdown');
	select.addEventListener('change', selectBreed);
}

function displayImages() {
	let imgContainer = document.getElementById('dog-image-container');
	for (image of IMAGES) {
		imageElement = document.createElement('img');
		imgContainer.appendChild(imageElement);
		imageElement.src = image;
	}
}

function addBreeds() {
	let breedContainer = document.getElementById('dog-breeds');
	for (breed of BREEDS) {
		let li = document.createElement('li');
		breedContainer.appendChild(li);
		li.innerText = breed;
		li.onclick = function() {
			li.style.color = 'red';
		};
		li.id = breed[0];
	}
}

function selectBreed(event) {
	let lis = document.getElementsByTagName('li');
	let breedPrefix = event.target.value;
	if (breedPrefix == 'none') {
		for (li of lis) {
			li.style.display = '';
		}
	} else {
		for (let i = lis.length - 1; i >= 0; i--) {
			let li = lis[i];
			let identifier = li.id;
			if (identifier != breedPrefix) {
				li.style.display = 'none';
			} else {
				li.style.display = '';
			}
		}
	}
}
