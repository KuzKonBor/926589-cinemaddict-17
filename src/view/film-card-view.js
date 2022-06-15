import AbstractView from '../framework/view/abstract-view.js';
import {humanizeDate} from '../utils/film-card.js';
import FilmDetailsAndCommentsView from './film-detals-and-comments-view.js';

const createMovieCardViewTemplate = (film) => {
  const {
    filmInfo,
    userDetails,
    comments,
  } = film;

  const {
    title,
    release,
    poster,
    ageRating,
    runtime,
    genre,
    description
  } = filmInfo;

  const {
    watchlist,
    alreadyWatched,
    favorite,
  } = userDetails;

  const MAX_DESCRIPTION_LENGTH = 140;

  const years = release.date !== null ? humanizeDate(release.date) : '';

  const createDescription = (text) => {
    if (text.length < MAX_DESCRIPTION_LENGTH) {
      return text;
    }
    return `${text.slice(0, MAX_DESCRIPTION_LENGTH - 2)}...`;
  };

  const createFilmCardControlsButton = (name, textButton, isActive) =>
    `<button
  class="film-card__controls-item film-card__controls-item--${name}
  ${isActive === true ? 'film-card__controls-item--active' : ''}" type="button">${textButton}</button>`;

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
  <span class="film-card__comments">${comments.length} comments</span>

</a>
<div class="film-card__controls">
${createFilmCardControlsButton('add-to-watchlist', 'Add to watchlist', watchlist)}
${createFilmCardControlsButton('mark-as-watched', 'Mark as watched', alreadyWatched)}
${createFilmCardControlsButton('favorite', 'Mark as favorite', favorite)}
</div>
</article>`);
};
export default class FilmCardView extends AbstractView {
  #film = null;

  constructor (film) {
    super();
    this.#film = film;
  }

  #filmDetailsAndCommentsView = new FilmDetailsAndCommentsView();

  get template() {
    return createMovieCardViewTemplate(this.#film);
  }

  onSetPosterClick = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__poster').addEventListener('click', this.#onPosterClick);
  };

  onSetMarkAsWatchedClick = (callback) => {
    this._callback.markAsWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#onMarkAsWatchedClick);
  };

  onSetAddToWatchlistClick = (callback) => {
    this._callback.addToWatchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#onAddToWatchlistClick);
  };

  onSetFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#onFavoriteClick);
  };

  #onPosterClick = (evt) => {
    evt.preventDefault();
    this._callback.click(this.#film);
  };

  #onMarkAsWatchedClick = (evt) => {
    evt.preventDefault();
    evt.target.classList.toggle('film-card__controls-item--active');
    this._callback.markAsWatchedClick();
  };

  #onAddToWatchlistClick = (evt) => {
    evt.preventDefault();
    evt.target.classList.toggle('film-card__controls-item--active');
    this._callback.addToWatchlistClick();
  };

  #onFavoriteClick = (evt) => {
    evt.preventDefault();
    evt.target.classList.toggle('film-card__controls-item--active');
    this._callback.favoriteClick();

  };

}
