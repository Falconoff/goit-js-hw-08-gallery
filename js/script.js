import galleryItemsArray from '../app.js';

const galleryEl = document.querySelector('.js-gallery');
const lightboxEL = document.querySelector('.js-lightbox');
const lightboxOverlayEl = document.querySelector('.lightbox__overlay');
const closeLightboxBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const lightboxImageEl = document.querySelector('.lightbox__image');

let indexOfCurrentImg = 0;

galleryEl.innerHTML = createGalleryMarkup(galleryItemsArray);
galleryEl.addEventListener('click', onOpenLightbox);
closeLightboxBtn.addEventListener('click', onCloseLightbox);
lightboxOverlayEl.addEventListener('click', onCloseLightbox);

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

function onOpenLightbox(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  showLightbox(e);
}

function onCloseLightbox() {
  lightboxEL.classList.remove('is-open');
  setImgAttributes('', '');
  window.removeEventListener('keydown', onKeyPress);
}

function showLightbox(evt) {
  lightboxEL.classList.add('is-open');
  setImgAttributes(evt.target.dataset.source, evt.target.getAttribute('alt'));
  findIndexOfCurrentImg(evt.target.dataset.source);
  window.addEventListener('keydown', onKeyPress);
}

function setImgAttributes(src, alt) {
  lightboxImageEl.setAttribute('src', src);
  lightboxImageEl.setAttribute('alt', alt);
}

function findIndexOfCurrentImg(srcOfCurrentImg) {
  galleryItemsArray.forEach(item => {
    if (item.original === srcOfCurrentImg) {
      indexOfCurrentImg = galleryItemsArray.indexOf(item);
    }
  });
}

function onKeyPress(e) {
  switch (e.code) {
    case 'Escape':
      onCloseLightbox();
      break;
    case 'ArrowRight':
      calcNextIndex();
      showNewImg();
      break;
    case 'ArrowLeft':
      calcPrevIndex();
      showNewImg();
      break;
    default:
      break;
  }
}

function calcNextIndex() {
  indexOfCurrentImg =
    indexOfCurrentImg >= galleryItemsArray.length - 1
      ? 0
      : indexOfCurrentImg + 1;
}

function calcPrevIndex() {
  indexOfCurrentImg =
    indexOfCurrentImg === 0
      ? galleryItemsArray.length - 1
      : indexOfCurrentImg - 1;
}

function showNewImg() {
  setImgAttributes(
    galleryItemsArray[indexOfCurrentImg].original,
    galleryItemsArray[indexOfCurrentImg].description,
  );
}
