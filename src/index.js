console.log('%c HI', 'color: firebrick')


document.addEventListener("DOMContentLoaded", function(){
   const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
   const dogImageContainer = document.getElementById('dog-image-container');
   const breedUrl = 'https://dog.ceo/api/breeds/list/all';
   let dogBreedsContainer = document.querySelector('#dog-breeds')
   const breedDropdown = document.getElementById("breed-dropdown")

   fetch(imgUrl)
   .then(response => {
      if (response.ok){
         return response.json();
      }
   })
   .then(json => {
      let dogPics = json.message;
      dogPics.forEach(imageParser);
   });

   fetch(breedUrl)
   .then(response => {
      if (response.ok){
         return response.json();
      }
})
   .then(json => {
      let dogBreeds = Object.keys(json.message);
      dogBreeds.forEach(breedParser);
   });

   dogBreedsContainer.addEventListener('click', function(event){
      if (event.target.style.color != 'blue'){
         event.target.style.color = 'blue';
      }
      else if (event.target.style.color == 'blue')
      {event.target.style.color = 'black'}
   });

   breedDropdown.addEventListener('change', function(event){
      let listItem = document.querySelectorAll('#breedName');
      listItem.forEach(function(breed){
         if (event.target.value == 'none'){
            breed.style.display = '';
         }
         else if (breed.innerHTML[0] !== event.target.value){
            breed.style.display = 'none';
         }
         else breed.style.display = '';
      });
   })

   function imageParser(url){
      const newImage = document.createElement('img');
      newImage.src = url;
      newImage.style.height = '200px'
      dogImageContainer.append(newImage);

   }

   function breedParser(breed){
      const newList = document.createElement('li');
      newList.textContent = breed;
      newList.id = 'breedName';
      dogBreedsContainer.append(newList);
   }
}) //end of DOMloader
