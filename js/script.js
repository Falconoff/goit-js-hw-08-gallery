import galleryItemsArray from '../app.js';
// console.log(galleryItems);

const galleryEl = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const closeLightboxBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const lightboxImage = document.querySelector('.lightbox__image');

let indexOfCurrentImg = 0;

// ============ create gallery ===========================

function createGalleryMarkup(array) {
  return array
    .map(({ preview, original, description }) => {
      // console.log(description);
      return `<li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
    })
    .join('');
}

galleryEl.innerHTML = createGalleryMarkup(galleryItemsArray);
// ------------------------------------------------------------

// --- click on picture, open Lightbox ---
galleryEl.addEventListener('click', e => {
  e.preventDefault();
  // console.log(e);

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  showLightbox(e);
});

function showLightbox(evt) {
  lightbox.classList.add('is-open');
  lightboxImage.setAttribute('src', evt.target.dataset.source);
  lightboxImage.setAttribute('alt', evt.target.getAttribute('alt'));

  indexOfCurrentImg = findIndexOfCurrentImg();
  // console.log('indexOfCurrentImg--start=', indexOfCurrentImg);

  window.addEventListener('keydown', onKeyPress);
}

function onKeyPress(e) {
  // console.log(e);
  switch (e.code) {
    case 'Escape':
      // console.log('I click ESC btn');
      closeLightbox();
      break;
    case 'ArrowRight':
      showNextImg(galleryItemsArray, indexOfCurrentImg);
      break;
    case 'ArrowLeft':
      showPrevImg(galleryItemsArray, indexOfCurrentImg);
      break;
    default:
      break;
  }
}

// --- click Close Lightbox Button
closeLightboxBtn.addEventListener('click', () => {
  // console.log('click on closeLightboxBtn');
  closeLightbox();
});

// --- close Lightbox function ---
function closeLightbox() {
  // console.log('CLOSE');
  lightbox.classList.remove('is-open');

  lightboxImage.setAttribute('src', '');
  lightboxImage.setAttribute('alt', '');

  window.removeEventListener('keydown', onKeyPress);
}

// --- click on overlay ---
lightboxOverlay.addEventListener('click', () => {
  // console.log('click on overlay');
  closeLightbox();
});

function findIndexOfCurrentImg() {
  const srcOfCurrentImg = lightboxImage.getAttribute('src');
  // console.log('srcOfCurrentImg:', srcOfCurrentImg);
  let currentIndex;
  galleryItemsArray.find((item, index) => {
    if (item.original === srcOfCurrentImg) {
      currentIndex = index;
    }
  });
  // console.log('currentIndex:', currentIndex);
  return currentIndex;
}

function showNextImg(array, index) {
  // console.log('f.showNextImg received index=', index);

  index = index >= array.length - 1 ? 0 : index + 1;
  // console.log('new index=', index);
  changeLightboxImgAttributes(array, index);
  indexOfCurrentImg = index;
}

function showPrevImg(array, index) {
  // console.log('f.showPrevImg received index=', index);
  index = index === 0 ? array.length - 1 : index - 1;
  // console.log('new index=', index);
  changeLightboxImgAttributes(array, index);
  indexOfCurrentImg = index;
}

function changeLightboxImgAttributes(array, index) {
  lightboxImage.setAttribute('src', array[index].original);
  lightboxImage.setAttribute('alt', array[index].description);
}
// changeLightboxImgAttributes(galleryItemsArray[2].original, galleryItemsArray[2].description);
// console.log(galleryItemsArray[2].description);
