import { renderGallery } from './gallery.js';
import { debounce } from './util.js';

const sortingElement = document.querySelector('.img-filters');
const sortingForm = document.querySelector('.img-filters__form');
const defaultButton = sortingForm.querySelector('#filter-default');
const randomButton = sortingForm.querySelector('#filter-random');
const discussedButton = sortingForm.querySelector('#filter-discussed');

const MAX_RANDOM_SORTING = 10;
const RANDOM_OFFSET = 0.5;

const SortingType = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const sorting = {
  [SortingType.DEFAULT]: (pictures) => pictures,
  [SortingType.RANDOM]: (pictures) => pictures.slice().sort(() => Math.random() - RANDOM_OFFSET).slice(0, MAX_RANDOM_SORTING),
  [SortingType.DISCUSSED]: (pictures) => pictures.slice().sort((item1, item2) => item2.comments.length - item1.comments.length)
};

const repaint = (evt, filter, pictures) => {
  const sortedPictures = sorting[filter](pictures);
  const picturesElement = document.querySelectorAll('.picture');
  picturesElement.forEach((picture) => picture.remove());
  renderGallery(sortedPictures);
  const currentSortingElement = document.querySelector('.img-filters__button--active');
  currentSortingElement.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const debounceRepaint = debounce(repaint);

const initSorting = (pictures) => {
  sortingElement.classList.remove('img-filters--inactive');
  defaultButton.addEventListener('click', (evt) => {
    debounceRepaint(evt, SortingType.DEFAULT, pictures);
  });
  randomButton.addEventListener('click', (evt) => {
    debounceRepaint(evt, SortingType.RANDOM, pictures);
  });
  discussedButton.addEventListener('click', (evt) => {
    debounceRepaint(evt, SortingType.DISCUSSED, pictures);
  });
};

export { initSorting };
