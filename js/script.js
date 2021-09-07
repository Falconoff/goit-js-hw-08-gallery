import galleryItems from '../app.js';
// console.log(galleryItems);

const galleryEl = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const closeLightboxBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const lightboxImage = document.querySelector('.lightbox__image');

// --- create gallery ---
const galleryItemsArray = galleryItems.map(
  ({ preview, original, description }) => {
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
  },
);
// console.log(galleryItemsArray.join(''));

galleryEl.insertAdjacentHTML('beforeend', galleryItemsArray.join(''));

// --- click on picture, open Lightbox ---
galleryEl.addEventListener('click', e => {
  e.preventDefault();
  // console.log(e.target);

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  lightbox.classList.add('is-open');

  // const lightboxImage = document.querySelector('.lightbox__image');
  lightboxImage.setAttribute('src', e.target.dataset.source);
  // console.log(e.target.getAttribute('alt'));
  lightboxImage.setAttribute('alt', e.target.getAttribute('alt'));

  window.addEventListener('keydown', onEscPress);
});

// --- click Close Lightbox Button
closeLightboxBtn.addEventListener('click', () => {
  console.log('click on closeLightboxBtn');
  closeLightbox();
});

// --- close Lightbox function ---
function closeLightbox() {
  console.log('CLOSE');
  lightbox.classList.remove('is-open');

  lightboxImage.setAttribute('src', '');
  lightboxImage.setAttribute('alt', '');

  window.removeEventListener('keydown', onEscPress);
}

// --- click on overlay ---
const lightboxOverlay = document.querySelector('.lightbox__overlay');
lightboxOverlay.addEventListener('click', () => {
  console.log('click on overlay');
  closeLightbox();
});

// --- click on ESC button ---
function onEscPress(e) {
  // window.addEventListener('keydown', e => {
  console.log(e);
  if (e.code === 'Escape') {
    closeLightbox();
  }
}
