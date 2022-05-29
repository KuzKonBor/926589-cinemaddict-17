import dayjs from 'dayjs';
import {getRandomInteger} from './utils/common.js';

const getRandomData = (data) => {
  const randomIndex = getRandomInteger(0, data.length - 1);
  return data[randomIndex];
};

const humanizeReleaseDate = (dueDate) => dayjs(dueDate).format('D MMMM YYYY');
const humanizeDate = (date) => dayjs(date).format('YYYY');

export {humanizeReleaseDate, getRandomData, humanizeDate};
