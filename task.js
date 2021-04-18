import images from './gallery-items.js';

const galleryListRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const modalImage = modalRef.querySelector('.lightbox__image');
const closeModalBtn = modalRef.querySelector('.lightbox__button');
const overlayRef = modalRef.querySelector('.lightbox__overlay');

const imagesMarkup = createGalleryMarkup(images);

galleryListRef.insertAdjacentHTML('beforeend', imagesMarkup);


galleryListRef.addEventListener('click', onGalleryImageClick);
closeModalBtn.addEventListener('click', onModalBtnClick);
overlayRef.addEventListener('click', onOverlayClick);

const imagesRef = galleryListRef.querySelectorAll('.gallery__image');
console.log(imagesRef);
// const imageRef = galleryListRef.querySelector('.lightbox__image');
const imagesUrl = [];
imagesRef.forEach(el => {
  imagesUrl.push(el.getAttribute('data-source'));
});

function createGalleryMarkup(images) {
    return images.map(({ preview, original, description }) => {
        return `
    <li class="gallery__item">
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
    </li>
    `;
    }).join('');
}

function onGalleryImageClick(event) {
    event.preventDefault();

    const isImage = event.target.classList.contains('gallery__image');
    if (!isImage) {
        return;
    }

    window.addEventListener('keydown', onKeydown);
    modalRef.classList.add('is-open');

    const currentModalImageUrl = event.target.dataset.source;
    const cuttentModalImageAlt = event.target.alt;

    setModalImageAttributes(currentModalImageUrl, cuttentModalImageAlt);
}

function onModalBtnClick() {
    window.removeEventListener('keydown', onKeydown);
    modalRef.classList.remove('is-open');

    setModalImageAttributes('#', '#');
}

function onOverlayClick(event) {
    const isOverlay = event.target.classList.contains('lightbox__overlay');
    if (isOverlay) {
        onModalBtnClick()
    }
}

function onKeydown(event) {
    let imageIndex = imagesUrl.indexOf(modalImage.src);
    
    if (event.code === 'ArrowLeft') {
        imageIndex -= 1;
        if (imageIndex === -1) {
            imageIndex = imagesUrl.length - 1;
        }
    }

    if (event.code === 'ArrowRight') {
        imageIndex += 1;
        if (imageIndex === imagesUrl.length) {
            imageIndex = 0;
        }
    }

    if (event.code === 'Escape') {
        onModalBtnClick();
    }

    const currentSrc = imagesUrl[imageIndex];
    const currentAlt = imagesRef[imageIndex].getAttribute('alt');

    setModalImageAttributes(currentSrc, currentAlt);
}

function setModalImageAttributes(src, alt) {
    modalImage.src = src;
    modalImage.alt = alt;
}