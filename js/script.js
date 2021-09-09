import galleryItemsArray from '../app.js';
// console.log(galleryItems);

const galleryEl = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const closeLightboxBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const lightboxImage = document.querySelector('.lightbox__image');

let indexOfCurrentImg = 0;

// --- create gallery ---
const galleryItemsMarkupArray = galleryItemsArray.map(
  ({ preview, original, description }, index) => {
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
        data-index="${index}"
        alt="${description}"
      />
    </a>
  </li>`;
  },
);
// console.log(galleryItemsMarkupArray.join(''));

galleryEl.innerHTML = galleryItemsMarkupArray.join('');

// --- click on picture, open Lightbox ---
galleryEl.addEventListener('click', e => {
  e.preventDefault();
  console.log(e);

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  // ===== function "show Lightbox" ======================
  lightbox.classList.add('is-open');

  // const lightboxImage = document.querySelector('.lightbox__image');
  lightboxImage.setAttribute('src', e.target.dataset.source);
  // console.log(e.target.getAttribute('alt'));
  lightboxImage.setAttribute('alt', e.target.getAttribute('alt'));

  findIndexOfCurrentImg();
  window.addEventListener('keydown', onEscPress);
  window.addEventListener('keydown', onRightArrowPress);
  window.addEventListener('keydown', onLeftArrowPress);
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

  window.removeEventListener('keydown', onEscPress);
  window.removeEventListener('keydown', onRightArrowPress);
  window.removeEventListener('keydown', onLeftArrowPress);
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
    // indexOfCurrentImg = findIndexOfCurrentImg();
    // console.log('indexOfCurrentImg:', indexOfCurrentImg);
    console.log('indexOfCurrentImg--2:', indexOfCurrentImg);
    showNextImg(indexOfCurrentImg);
  }
  // console.log('indexOfCurrentImg:', indexOfCurrentImg);
}

// --- click on Right Arrow button ---
function onLeftArrowPress(e) {
  console.log(e);
  if (e.code === 'ArrowLeft') {
    console.log('ArrowLeft click');
    // indexOfCurrentImg = findIndexOfCurrentImg();
    console.log('indexOfCurrentImg--2:', indexOfCurrentImg);

    showPrevImg(indexOfCurrentImg, galleryItemsArray.length - 1);
  }
  // console.log('indexOfCurrentImg:', indexOfCurrentImg);
}

function findIndexOfCurrentImg() {
  const srcOfCurrentImg = lightboxImage.getAttribute('src');
  console.log('srcOfCurrentImg:', srcOfCurrentImg);

  galleryItemsArray.find((item, index) => {
    if (item.original === srcOfCurrentImg) {
      console.log('I find index:', index);
      indexOfCurrentImg = index;
      console.log('indexOfCurrentImg:', indexOfCurrentImg);

      // return index;
    }
  });
}
console.log('indexOfCurrentImg--2:', indexOfCurrentImg);

// window.addEventListener('keydown', e => {
//   console.log(e);
// });

function showNextImg(index) {
  console.log('f.showNextImg received index=', index);
  // if (index >= galleryItemsArray.length - 1) {
  //   index = 0;
  // } else {
  //   index += 1;
  // }
  index = index >= galleryItemsArray.length - 1 ? 0 : index + 1;
  console.log('new index=', index);
  showPicture(
    galleryItemsArray[index].original,
    galleryItemsArray[index].description,
  );
  indexOfCurrentImg = index;
}

function showPrevImg(index, maxIndex) {
  console.log('f.showPrevImg received index=', index);
  index = index === 0 ? maxIndex : index - 1;
  console.log('new index=', index);
  showPicture(
    galleryItemsArray[index].original,
    galleryItemsArray[index].description,
  );
  indexOfCurrentImg = index;
}

function showPicture(src, alt) {
  lightboxImage.setAttribute('src', src);
  lightboxImage.setAttribute('alt', alt);
}
// showPicture(galleryItemsArray[2].original, galleryItemsArray[2].description);
// console.log(galleryItemsArray[2].description);
