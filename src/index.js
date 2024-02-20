import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Opisany w dokumentacji
import SimpleLightbox from "simplelightbox";
// Dodatkowy import stylów
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";
keyApiPixabay="42443231-e69777d4d2b71e5eeb75f7bd2";
const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");

const textSearch = "cat+black";



Notify.info("start");

// onst arrayDiv=galleryItems.map((item) => {
//   const aImage = document.createElement('a');
//   aImage.setAttribute('class', 'gallery__item gallery_link');
//   aImage.href = item.original;
//   const image = document.createElement('img');
//   image.setAttribute('class', 'gallery__image');
//   image.src=item.preview;
//   image.alt=item.description;
//   aImage.append(image);
//   return aImage;
// });
// ulGallery.append(...arrayDiv);

  
// const gallery = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });








const showValue=((data)=>{ 
  if(data.hits.length<=0){
      Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }
  else{
  // console.log("test");
  console.log(data.hits);
  gallery.replaceChildren();
  data.hits.map(({webformatURL,largeImageURL,tags, likes, views, comments, downloads})=>{

    gallery.insertAdjacentHTML('beforeend',
   `
  <div class="photo-card">
  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>
  `);
  });
  
  }
  

});


// const gallerys = new SimpleLightbox('.photo-card div', {
//   captionsData: 'alt',
//   captionDelay: 250,
//   });


form.addEventListener("submit", (evt) => {
  const urlQuestion=`https://pixabay.com/api/?key=${keyApiPixabay}&q=${form.elements.searchQuery.value.split(" ").join("+")}&image_type=photo_orientation=horizontal_safesearch=true`;
  evt.preventDefault();
  
  
    // const valueSearch = axios.get(urlQuestion)
    //                         .then(res => res.data)
    //                         .catch(error => error.message);
  fetch(urlQuestion)
    .then((res) => res.json())
    .then((data=>showValue(data)))
    .catch((error) => console.log(error));
        
    // form.reset();
  });



  
// fetch(urlQuestion)
//     .then((res) => res.json())
//     .then((data => console.log(data)));



