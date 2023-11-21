import { renderGallery } from './gallery.js';
import './form.js';
import { loadPictures } from './api.js';
import { showErrorMessage } from './util.js';
import { initSorting } from './sorting.js';

const bootstrap = async () => {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
    initSorting(pictures);
  } catch (error) {
    showErrorMessage();
  }
};

bootstrap();
