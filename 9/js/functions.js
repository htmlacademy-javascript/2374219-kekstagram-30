function checkMaxLength (string, length) {
  return string.length <= length;
}

// Cтрока короче 20 символов
checkMaxLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkMaxLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkMaxLength('проверяемая строка', 10); // false

function isPalindrom (givenString) {
  const string = givenString.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < string.length / 2; i++) {
    if (string.at(i) !== string.at(-i - 1)) {
      return false;
    }
  }
  return true;
}

// Строка является палиндромом
isPalindrom('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrom('ДовОд'); // true
// Это не палиндром
isPalindrom('Кекс'); // false
// Это палиндром
isPalindrom('Лёша на полке клопа нашёл '); // true

function extractNumber (arg) {
  const string = arg.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string [i];
    }
  }
  return parseInt(result, 10);
}

extractNumber('2023 год'); // 2023
extractNumber('ECMAScript 2022'); // 2022
extractNumber('1 кефир, 0.5 батона'); // 105
extractNumber('а я томат'); // NaN
extractNumber(2023); // 2023
extractNumber(-1); // 1
extractNumber(1.5); // 15
