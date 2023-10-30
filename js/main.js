import { getPictures } from './data.js';
import { renderThumbnails } from './thumbnail.js';

const pictures = getPictures();
renderThumbnails(pictures);
