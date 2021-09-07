import galleryItems from '../app.js';
// console.log(galleryItems);

const galleryEl = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);

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

// --- click on picture ---
galleryEl.addEventListener('click', e => {
  e.preventDefault();
  // console.log(e.target);

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  lightbox.classList.add('is-open');

  const lightboxImage = document.querySelector('.lightbox__image');
  lightboxImage.setAttribute('src', e.target.dataset.source);
  // console.log(e.target.getAttribute('alt'));
  lightboxImage.setAttribute('alt', e.target.getAttribute('alt'));
});

// --- close lightbox ---
closeModalBtn.addEventListener('click', () => {
  lightbox.classList.remove('is-open');
});
