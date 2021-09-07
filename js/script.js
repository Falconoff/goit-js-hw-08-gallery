import galleryItems from '../app.js';
// console.log(galleryItems);

const galleryEl = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);

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
