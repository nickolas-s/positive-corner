/* eslint-disable no-use-before-define */
import jsonData from './data.json';

const feedbackBtn = document.querySelector('.feedback-btn');
const quotekBtn = document.querySelector('.quote-btn');

function Modal(data) {
  if (!data) {
    throw new Error('No data on the modal');
  }

  const modal = document.querySelector('.modal');
  const nextButton = modal.querySelector('.next');
  const prevButton = modal.querySelector('.prev');
  let currentIndex = 0;

  function openModal() {
    if (modal.matches('.open')) {
      console.log('Modal is already open');
      return;
    }
    modal.classList.add('open');
    showImage(data[currentIndex]);

    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function showImage(el) {
    if (!el) {
      console.log('There is no image to show!');
      return;
    }
    modal.querySelector('img').src = el.url;
  }

  function showNextImage() {
    // currentIndex + 1 >= data.length ? (currentIndex = 0) : (currentIndex += 1);
    if (currentIndex + 1 >= data.length) {
      currentIndex = 0;
    } else {
      currentIndex += 1;
    }
    showImage(data[currentIndex]);
  }

  function showPrevImage() {
    // currentIndex - 1 < 0 ? (currentIndex = data.length - 1) : (currentIndex -= 1);
    if (currentIndex - 1 < 0) {
      currentIndex = data.length - 1;
    } else {
      currentIndex -= 1;
    }

    showImage(data[currentIndex]);
  }

  function handleKeyUp(e) {
    if (e.key === 'Escape') return closeModal();
    if (e.key === 'ArrowRight') return showNextImage();
    if (e.key === 'ArrowLeft') return showPrevImage();
  }

  function closeModal() {
    modal.classList.remove('open');
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) closeModal();
  }

  modal.addEventListener('click', handleClickOutside);
  openModal();
}

feedbackBtn.addEventListener('click', () => Modal(jsonData.feedback));
quotekBtn.addEventListener('click', () => Modal(jsonData.quotes));
