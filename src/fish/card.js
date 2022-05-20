import {getRandomData} from './util.js';
import {ID, POSTERS, TITLES_FILMS, DESCRIPTION_FILMS, AGE_RATINGS, GENRES, ALTERNATIVE_TITLES, RUNTIMES, RELEASE_COUNTRYS, WATCHING_DATES} from './data.js';

const getFilmCard = () => ({
  id: getRandomData(ID),
  comments: [1, 2, 3, 4, 5],
  filmInfo: {
    title: getRandomData(TITLES_FILMS), //заголовок
    alternativeTitle: getRandomData(ALTERNATIVE_TITLES), //Альтернативный заголовок
    totalRating: '99.4', //Общая оценка
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
      date: getRandomData(WATCHING_DATES),
      releaseCountry: getRandomData(RELEASE_COUNTRYS), //Страна выпуска
    },
    runtime: getRandomData(RUNTIMES), //продолжительность фильма
    genre: [ //жанр
      getRandomData(GENRES)
    ],
    description: getRandomData(DESCRIPTION_FILMS), //описание
  },
  userDetails: {
    watchlist: false, //список наблюдения
    alreadyWatched: true, //уже Смотрел
    watchingDate: getRandomData(WATCHING_DATES), //Дата просмотра
    favorite: false, //любимый фильм
  }
});

export {getFilmCard};
