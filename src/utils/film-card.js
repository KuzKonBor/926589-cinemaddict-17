import dayjs from 'dayjs';
import {getRandomInteger} from '../utils/common.js';

const getRandomData = (data) => {
  const randomIndex = getRandomInteger(0, data.length - 1);
  return data[randomIndex];
};

const humanizeReleaseDate = (date) => dayjs(date).format('D MMMM YYYY');
const humanizeDate = (date) => dayjs(date).format('YYYY');

const getSortRating = (ratingA, ratingB) =>  ratingA.filmInfo.totalRating - ratingB.filmInfo.totalRating;

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortFilmsDown = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.filmInfo.release.date, taskB.filmInfo.release.date);

  return weight ?? dayjs(taskB.filmInfo.release.date).diff(dayjs(taskA.filmInfo.release.date));
};

export {humanizeReleaseDate, getRandomData, humanizeDate, sortFilmsDown, getSortRating};
