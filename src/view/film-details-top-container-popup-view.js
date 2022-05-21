import {createElement} from '../render.js';
import {humanizeReleaseDate} from '../fish/util.js';

const createFilmDetailsTopContainerViewTemplate = (film) => {
  const {totalRating, title, alternativeTitle, release, poster, ageRating, runtime, genre, description, writers, actors, director } = film.filmInfo;
  //const {watchlist, alreadyWatched, watchingDate, favorite} = film.userDetails;
  const years = release.date !== null
    ? humanizeReleaseDate(release.date)
    : '';

  return (`<div class="film-details__top-container">
<div class="film-details__close">
  <button class="film-details__close-btn" type="button">close</button>
</div>
<div class="film-details__info-wrap">
  <div class="film-details__poster">
    <img class="film-details__poster-img" src="${poster}" alt="">
    <p class="film-details__age">${ageRating}</p>
  </div>
  <div class="film-details__info">
    <div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${title}</h3>
        <p class="film-details__title-original">Original: ${alternativeTitle}</p>
      </div>

      <div class="film-details__rating">
        <p class="film-details__total-rating">${totalRating}</p>
      </div>
    </div>
    <table class="film-details__table">
      <tbody><tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${director}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">${writers}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">${actors}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">${years}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${runtime}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${release.releaseCountry}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Genres</td>
        <td class="film-details__cell">
          <span class="film-details__genre">${genre}</span>
          <span class="film-details__genre">${genre}</span>
          <span class="film-details__genre">${genre}</span></td>
      </tr>
    </tbody></table>
    <p class="film-details__film-description">
${description}
    </p>
  </div>
</div>
</div>`
  );
};
export default class FilmDetailsTopContainerView {
  #element = null;
  #film = null;

  constructor (film){
    this.#film = film;
  }

  get template() {
    return createFilmDetailsTopContainerViewTemplate(this.#film);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
