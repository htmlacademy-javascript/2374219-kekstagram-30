import { debounce } from './util.js';
import { renderThumbnails } from './thumbnail';

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

const SortingHandlers = {
  [SortingType.DEFAULT]: (pictures) => pictures,
  [SortingType.RANDOM]: (pictures) => {
    const newPictures = [...pictures];
    return newPictures.sort(() => Math.random() - RANDOM_OFFSET).slice(0, MAX_RANDOM_SORTING);
  },
  [SortingType.DISCUSSED]: (pictures) => {
    const newPictures = [...pictures];
    return newPictures.sort((item1, item2) => item2.comments.length - item1.comments.length);
  }
};

const repaint = (evt, filter, pictures) => {
  const sortedPictures = SortingHandlers[filter](pictures);
  const picturesElement = document.querySelectorAll('.picture');
  picturesElement.forEach((picture) => picture.remove());
  renderThumbnails(sortedPictures);
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
