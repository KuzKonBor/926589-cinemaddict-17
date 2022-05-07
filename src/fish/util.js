import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const randomData = (data) => {
  const randomIndex = getRandomInteger(0, data.length - 1);
  return data[randomIndex];
};

const humanizeReleaseDate = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');
const humanizeDate = (date) => dayjs(date).format('YYYY');

export {getRandomInteger, humanizeReleaseDate, randomData, humanizeDate};