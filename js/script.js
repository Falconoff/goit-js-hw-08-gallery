import galleryItemsArray from '../app.js';

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
galleryEl.addEventListener('click', onOpenLightbox);

function onOpenLightbox(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }
  showLightbox(e);
}

function showLightbox(evt) {
  lightbox.classList.add('is-open');
  lightboxImage.setAttribute('src', evt.target.dataset.source);
  lightboxImage.setAttribute('alt', evt.target.getAttribute('alt'));

  indexOfCurrentImg = findIndexOfCurrentImg();

  window.addEventListener('keydown', onKeyPress);
}

function onKeyPress(e) {
  switch (e.code) {
    case 'Escape':
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
  closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('is-open');

  lightboxImage.setAttribute('src', '');
  lightboxImage.setAttribute('alt', '');

  window.removeEventListener('keydown', onKeyPress);
}

// --- click on overlay ---
lightboxOverlay.addEventListener('click', () => {
  closeLightbox();
});

function findIndexOfCurrentImg() {
  const srcOfCurrentImg = lightboxImage.getAttribute('src');
  let currentIndex;
  galleryItemsArray.find((item, index) => {
    if (item.original === srcOfCurrentImg) {
      return (currentIndex = index);
    }
  });
  return currentIndex;
}

function showNextImg(array, index) {
  index = index >= array.length - 1 ? 0 : index + 1;
  changeLightboxImgAttributes(array, index);
  indexOfCurrentImg = index;
}

function showPrevImg(array, index) {
  index = index === 0 ? array.length - 1 : index - 1;
  changeLightboxImgAttributes(array, index);
  indexOfCurrentImg = index;
}

function changeLightboxImgAttributes(array, index) {
  lightboxImage.setAttribute('src', array[index].original);
  lightboxImage.setAttribute('alt', array[index].description);
}
