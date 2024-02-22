import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

const urlSearch="https://pixabay.com/api/?";
const keyApiPixabay="42443231-e69777d4d2b71e5eeb75f7bd2";
const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");

Notify.info("start");
const queryPar = new URLSearchParams({
  key: keyApiPixabay,
  q: "",
  image_type: 'photo',
  orientation: 'horizontal',
  page:1,
  per_page: 40,
});




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
  console.log(data);
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



const fetchSearch = async () =>{
  queryPar.set("q",form.elements.searchQuery.value.split(" ").join("+"));
  const res = await axios.get(`${urlSearch}${queryPar}`);
  return res;
};

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  fetchSearch()
    .then(res => showValue(res.data))
    .catch(error => console.log(error));
});
