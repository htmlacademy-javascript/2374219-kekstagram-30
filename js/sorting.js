import { debounce } from './util.js';
import {renderThumbnails} from './thumbnail';

const sortingElement = document.querySelector('.img-filters');
const sortingForm = document.querySelector('.img-filters__form');
const defaultButton = sortingForm.querySelector('#filter-default');
const randomButton = sortingForm.querySelector('#filter-random');
const discussedButton = sortingForm.querySelector('#filter-discussed');

const MAX_RANDOM_SORTING = 10;
const RANDOM_OFFSET = 0.5;
const ACTIVE_CLASS = 'img-filters__button--active';

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
    return [...newPictures].sort((item1, item2) => item2.comments.length - item1.comments.length);
  }
};

let activeButton = defaultButton;

const currentSortingElement = (button) => {
  activeButton.classList.remove(ACTIVE_CLASS);
  button.classList.add(ACTIVE_CLASS);
  activeButton = button;
};

const clearContainer = () => {
  const picturesElement = document.querySelectorAll('.picture');
  picturesElement.forEach((item) => item.remove());
};

const repaint = (filter, pictures) => {
  const sortedPictures = SortingHandlers[filter](pictures);
  clearContainer();
  renderThumbnails(sortedPictures);
};

const debounceRepaint = debounce(repaint, RANDOM_OFFSET);

const initSorting = (pictures) => {
  sortingElement.classList.remove('img-filters--inactive');
  sortingForm.addEventListener('click', (evt) => {
    const target = evt.target;
    if (!target.classList.contains('img-filters__button') || target === activeButton) {
      return;
    }
    currentSortingElement(target);
    if (target === defaultButton) {
      debounceRepaint(SortingType.DEFAULT, pictures);
    }
    if (target === randomButton) {
      debounceRepaint(SortingType.RANDOM, pictures);
    }
    if (target === discussedButton) {
      debounceRepaint(SortingType.DISCUSSED, pictures);
    }
  });
};

export { initSorting };
