const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// links for HTML
const ref = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  imgForModal: document.querySelector('.lightbox__image'),

}
const arreyLinkImages = [];

// 1  Create Gallery
const createMarkupGalerry = galleryItems.map(createOneImg).join('');
ref.gallery.insertAdjacentHTML('beforeend', createMarkupGalerry)

// // 2. Add Event Listener

ref.gallery.addEventListener('click', openModal);
// // Functions

function createOneImg({ preview, original, description }) {
  arreyLinkImages.push(original);
  return `
  <li class="gallery__item">
    <a class="gallery__link" href="">
      <img
        class="gallery__image"
        data-source="${original}"
        src="${preview}"
        alt="${description}">
    </a>
  </li>  
  `;
};

function openModal(evt) {
  evt.preventDefault();
  if (!evt.target.nodeName ==='IMG') {
    return;
  }
  
  ref.modal.classList.add('is-open');
  ref.imgForModal.src = evt.target.dataset.source;
  ref.imgForModal.alt = evt.target.alt;

    // close modal Listener
  ref.modal.addEventListener('click', closeModalClick);  
  document.addEventListener('keydown', closeModalEscKey);
  document.addEventListener('keydown', changeCurentModalImg);
}

function closeModal() {  
  // remove Classlist
  ref.modal.classList.remove('is-open');
  // remove Listener
  ref.modal.removeEventListener('click', closeModalClick);
  document.removeEventListener('keydown', closeModalEscKey);
  document.removeEventListener('keydown', changeCurentModalImg);
  // reset value
  ref.imgForModal.src = '';
  ref.imgForModal.alt = '';
}

function closeModalClick(evt) {
  const curentClickToClose = evt.target.classList.contains('lightbox__image')
  if (curentClickToClose) {
    return;
  }
  closeModal()
}

function closeModalEscKey(e) {
  if (e.key === 'Escape') {
    closeModal();
  }  
}

function changeCurentModalImg(evt) {
  const currentIndex = arreyLinkImages.indexOf(ref.imgForModal.src);
  if (evt.key === 'ArrowRight') {
    rightClick(currentIndex)
  } else if (evt.key === 'ArrowLeft') {
    leftClick(currentIndex)
  }
}

function rightClick(currentIndex) {
  let nextIndex = currentIndex + 1;
  if (nextIndex === arreyLinkImages.length) {
    nextIndex = 0
  }
  ref.imgForModal.src = arreyLinkImages[nextIndex];
}

function leftClick(currentIndex) {
  let nextIndex = currentIndex - 1;
  if (nextIndex === -1) {
    nextIndex = arreyLinkImages.length - 1;
  }
  ref.imgForModal.src = arreyLinkImages[nextIndex];
}