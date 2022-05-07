import {randomData} from './util.js';
import {POSTERS, TITLE_FILMS, DESCRIPTION_FILMS, AGE_RATING, GENRE, ALTERNATIVE_TITLE, RUNTIME, RELEASE_COUNTRY} from './data.js';


const getFilmCards = () => ({
  id: '0',
  comments: [
    11111100
  ],
  filmInfo: {
    title: randomData(TITLE_FILMS), //заголовок
    alternativeTitle: randomData(ALTERNATIVE_TITLE), //Альтернативный заголовок
    totalRating: '100.4', //Общая оценка
    poster: `./images/posters/${randomData(POSTERS)}`, //плакат
    ageRating: randomData(AGE_RATING), //возрастной рейтинг
    director: 'Конено, Я!',
    writers: [ //Сценаристы
      'Тоже, Я!'
    ],
    actors: [ //актеры
      'Самый крутой актёр-Я'
    ],
    release: { //выпущен
      date: '25 июня',
      releaseCountry:randomData(RELEASE_COUNTRY) //Страна выпуска
    },
    runtime: randomData(RUNTIME), //продолжительность фильма
    genre: [ //жанр
      randomData(GENRE)
    ],
    description: randomData(DESCRIPTION_FILMS), //описание
  },
  userDetails: {
    watchlist: false, //список наблюдения
    alreadyWatched: true, //уже Смотрел
    watchingDate: '2019-04-12T16:12:32.554Z', //Дата просмотра
    favorite: false, //любимый фильм
  }
});

export {getFilmCards};
