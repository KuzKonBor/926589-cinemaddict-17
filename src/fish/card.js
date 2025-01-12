import {getRandomData} from '../utils/film-card.js';
import {POSTERS, TITLES_FILMS, DESCRIPTION_FILMS, AGE_RATINGS, GENRES, ALTERNATIVE_TITLES, RUNTIMES, RELEASE_COUNTRYS, WATCHING_DATES} from './data.js';
import {nanoid} from 'nanoid';
import {getRandomBooleanValue, getRandomInteger} from '../utils/common.js';

const getFilmCard = () => ({
  id: nanoid(),
  comments: [1, 2, 3, 4, 5],
  filmInfo: {
    title: getRandomData(TITLES_FILMS), //заголовок
    alternativeTitle: getRandomData(ALTERNATIVE_TITLES), //Альтернативный заголовок
    totalRating: `${getRandomBooleanValue() ? getRandomInteger(1, 9) : 0}`, //Общая оценка
    poster: `./images/posters/${getRandomData(POSTERS)}`, //плакат
    ageRating: getRandomData(AGE_RATINGS), //возрастной рейтинг
    director: 'Конено, Я!',
    writers: [ //Сценаристы
      'Тоже, Я!'
    ],
    actors: [ //актеры
      'Самый крутой актёр это кто? Никогда не догадаетесь... Тадам, это - Я'
    ],
    release: { //выпущен
      date: `${getRandomInteger(1946, 2022)}`,
      releaseCountry: getRandomData(RELEASE_COUNTRYS), //Страна выпуска
    },
    runtime: getRandomData(RUNTIMES), //продолжительность фильма
    genre: [ //жанр
      getRandomData(GENRES),getRandomData(GENRES)
    ],
    description: getRandomData(DESCRIPTION_FILMS), //описание
  },
  userDetails: {
    watchlist: getRandomBooleanValue(), //список наблюдения
    alreadyWatched: getRandomBooleanValue(), //уже Смотрел
    watchingDate:getRandomData(WATCHING_DATES), //Дата просмотра
    favorite: getRandomBooleanValue(), //любимый фильм
  }
});
export {getFilmCard};
