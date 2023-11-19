const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const ServerRoute = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные',
  [Method.POST]: 'Ошибка загрузки файла'
};

const request = async (url, method = Method.GET, body = null) => {
  const response = await fetch(url, { method, body });
  if (!response.ok) {
    throw new Error(ErrorText[method]);
  }

  return response.json();
};

const loadPictures = async () => request(SERVER_URL + ServerRoute.GET_DATA);

const sendPicture = async (pictureData) =>
  request(
    SERVER_URL + ServerRoute.SEND_DATA,
    Method.POST,
    pictureData
  );

export { sendPicture };
export { loadPictures };
