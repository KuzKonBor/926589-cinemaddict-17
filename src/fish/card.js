import {randomData} from './util.js';
import {ID, POSTERS, TITLE_FILMS, DESCRIPTION_FILMS, AGE_RATING, GENRE, ALTERNATIVE_TITLE, RUNTIME, RELEASE_COUNTRY, WATCHING_DATE} from './data.js';


const getFilmCards = () => ({
  id: randomData(ID),
  comments: [
    1,
    2,
    3,
    4,
    5
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
      'Самый крутой актёр это кто? Никогда не догадаетесь... Тадам, это - Я'
    ],
    release: { //выпущен
      date: randomData(WATCHING_DATE),
      releaseCountry: randomData(RELEASE_COUNTRY), //Страна выпуска
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
    watchingDate: randomData(WATCHING_DATE), //Дата просмотра
    favorite: false, //любимый фильм
  }
});

export {getFilmCards};
