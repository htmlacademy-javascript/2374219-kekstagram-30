// Исходные данные
const PICTURE_NUMBER = 25;
const AVATAR_NUMBER = 6;
const LIKE_MIN_NUMBER = 15;
const LIKE_MAX_NUMBER = 200;
const COMMENT_NUMBER = 30;
const DESCRIPTIONS = [
  'Одна хорошая мысль утром меняет смысл целого дня.',
  'Когда любое совместное занятие превращается в приключение.',
  'On my way to paradise',
  'Диснеевская принцесса, которую вы заслужили.',
  'Немного наших будней вам в ленту.',
  'Моя личная версия «Орла и решки».',
  'Икона стиля районного масштаба.',
  'Нельзя просто так взять и сочинить глубокомысленный текст для фото',
  'Люблю хэштеги, они напоминают вафельки #worldbestgram #awesomepic #animals #master_shots #keksonature',
  'Разве не потрясающе?',
];
const COMMENT_LINES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = ['Барбатос', 'Моракс', 'Вельзевул', 'Буер', 'Фокалорс', 'Асмодей', 'Аим'];

//Вспомогательные функции

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (items) =>
  items[getRandomInteger(0, items.length - 1)];

const createIdGenerator = () => {
  let lastGenerateId = 0;

  return () => {
    lastGenerateId += 1;
    return lastGenerateId;
  };
};

const generateCommentId = createIdGenerator();

const createMessage = () => Array.from(
  { length: getRandomInteger(1, 2) },
  () => getRandomArrayElement(COMMENT_LINES),
).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_NUMBER)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_NUMBER, LIKE_MAX_NUMBER),
  comments: Array.from(
    { length: getRandomInteger(0, COMMENT_NUMBER) },
    createComment,
  ),
});

const getPictures = () => Array.from(
  { length: PICTURE_NUMBER },
  (_, pictureIndex) => createPicture(pictureIndex + 1),
);

getPictures();


