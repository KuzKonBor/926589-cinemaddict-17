import {createElement} from '../render.js';
import {humanizeDate} from '../fish/util.js';

const createMovieCardViewTemplate = (film) => {
  const {title, release, poster, ageRating, runtime, genre, description} = film.filmInfo;
  const MAX_DESCRIPTION_LENGTH = 140;

  const years = release.date !== null
    ? humanizeDate(release.date)
    : '';

  const createDescription = (text) => {
    if (text.length < MAX_DESCRIPTION_LENGTH) {
      return text;
    }

    return `${text.slice(0, MAX_DESCRIPTION_LENGTH - 2)}...`;
  };

  return (
    `<article class="film-card">
<a class="film-card__link">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${ageRating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${years}</span>
    <span class="film-card__duration">${runtime}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${createDescription(description)}</p>
  <span class="film-card__comments">30 comments</span>

</a>
<div class="film-card__controls">
  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
  <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
  <button class="film-card__controls-item film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
</div>
</article>`);
};
export default class MovieCardView {
  constructor (film){
    this.film = film;
  }

  getTemplate() {
    return createMovieCardViewTemplate(this.film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
