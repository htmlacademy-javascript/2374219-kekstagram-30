import { isEscapeKey } from './util.js';
import { init as initEffect, reset as resetEffect } from './filters.js';
import { resetScale } from './scale.js';
import { sendPicture } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_COUNT = 140;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Количество хэштегов не должно превышать ${MAX_HASHTAG_COUNT}`,
  NOT_UNIQUE: 'Хэштеги не должны повторяться',
  INVALID_PATTERN: 'Длина хэштега должна быть от 1 до 20 символов и начинаться с символа #. Доступные символы a-z, а-я, 0-9',
  INVALID_COMMENT_COUNT: `Комментарий не может быть длиннее ${MAX_COMMENT_COUNT} символов`,
};

const SubmitButtonCaption = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Отправить'
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const fileField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const picturePreview = form.querySelector('.img-upload__preview img');
const effectsPreview = form.querySelectorAll('.effects__preview');

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? SubmitButtonCaption.SUBMITTING : SubmitButtonCaption.IDLE;
};

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const pristine = new Pristine(form, {
  classTo : 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
});

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const hideModal = () => {
  form.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isErrorMessageExists = () => Boolean(document.querySelector('.error'));

function onDocumentKeydown (evt) {
  if (isEscapeKey && !isTextFieldFocused() && !isErrorMessageExists()) {
    evt.preventDefault();
    hideModal();
  }
}

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onFileInputChange = () => {
  const file = fileField.files[0];

  if (file && isValidType(file)) {
    picturePreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url('${picturePreview.src}')`;
    });
  }
  showModal();
};

const onCancelButtonClick = () => {
  hideModal();
};

const validateComment = (value) => {
  if(value.length <= 140) {
    return true;
  }
  return false;
};

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const sendForm = async (formElement) => {
  if (!pristine.validate()) {
    return;
  }
  try {
    toggleSubmitButton(true);
    await sendPicture(new FormData(formElement));
    toggleSubmitButton(false);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
    toggleSubmitButton(false);
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};

pristine.addValidator(
  commentField,
  validateComment,
  ErrorText.INVALID_COMMENT_COUNT,
  1,
  false
);

pristine.addValidator(
  hashtagField,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  1,
  false
);

pristine.addValidator(
  hashtagField,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  3,
  false
);

pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  2,
  false
);

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);

initEffect();
