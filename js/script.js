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
  console.log(e.target);

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  // ===== function "show Modal" ======================
  lightbox.classList.add('is-open');

  // const lightboxImage = document.querySelector('.lightbox__image');
  lightboxImage.setAttribute('src', e.target.dataset.source);
  // console.log(e.target.getAttribute('alt'));
  lightboxImage.setAttribute('alt', e.target.getAttribute('alt'));

  window.addEventListener(
    'keydown',
    onEscPress,
    onRightArrowPress,
    onLeftArrowPress,
  );
  // window.addEventListener('keydown', onRightArrowPress);
  // window.addEventListener('keydown', onLeftArrowPress);
  // ---------- end "show Modal" ----------------------------
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

  window.removeEventListener(
    'keydown',
    onEscPress,
    onRightArrowPress,
    onLeftArrowPress,
  );
  // window.removeEventListener('keydown', onRightArrowPress);
  // window.removeEventListener('keydown', onLeftArrowPress);
}

// --- click on overlay ---
const lightboxOverlay = document.querySelector('.lightbox__overlay');
lightboxOverlay.addEventListener('click', () => {
  console.log('click on overlay');
  closeLightbox();
});

// --- click on ESC button ---
function onEscPress(e) {
  console.log(e);
  if (e.code === 'Escape') {
    closeLightbox();
  }
}

// --- click on Right Arrow button ---
function onRightArrowPress(e) {
  console.log(e);
  if (e.code === 'ArrowRight') {
    console.log('ArrowRight click');
  }
}

// --- click on Right Arrow button ---
function onLeftArrowPress(e) {
  console.log(e);
  if (e.code === 'ArrowLeft') {
    console.log('ArrowLeft click');
  }
}

// window.addEventListener('keydown', e => {
//   console.log(e);
// });
