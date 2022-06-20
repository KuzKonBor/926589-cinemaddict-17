import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeReleaseDate} from '../utils/film-card.js';
import {EMOTIONS} from '../fish/const.js';
import {actualArrayComments} from '../presenter/board-presenter.js';

const creatingGenreItemTitle = (genre) => genre.length > 1 ? 'Genres' : 'Genre';

const createGenresItem = (genres) => genres
  .map((genre) => `<span class="film-details__genre">${genre}</span>`).join(' ');

const createFilmDetalsControlsButton = (name, textButton, isActive) =>
  `<button type="button"
  class="film-details__control-button
  ${isActive === true ? 'film-details__control-button--active' : ''}
  film-details__control-button--${name}" id="${name}" name="${name}">${textButton}</button>`;

const filterComments = (arrayComments, filmCard) => {
  let actualCommentsFilm = [];
  const comment = filmCard().comments;
  const commentsId = arrayComments.map((arrayComment) => arrayComment.id);
  for(let i = 0; i < comment.length; i++) {
    if (commentsId[i] === comment[i]) {
      actualCommentsFilm = arrayComments;
    }
  }
  return Array.from(actualCommentsFilm);
};

const createEmojisTemplate = (existingEmotion) => existingEmotion
  .map((emotion) =>
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
        <label class="film-details__emoji-label" for="emoji-${emotion}">
          <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
        </label>`)
  .join('');

const createFilmDetailsViewTemplate = (film) => {

  const {
    filmInfo,
    userDetails,
    comments,
  } = film;

  const {
    title,
    alternativeTitle,
    totalRating,
    poster,
    ageRating,
    director,
    writers,
    actors,
    release,
    runtime,
    genre,
    description,
  } = filmInfo;

  const {
    watchlist,
    alreadyWatched,
    favorite,
  } = userDetails;

  const years = release.date !== null
    ? humanizeReleaseDate(release.date)
    : '';

  return ( `<section class="film-details">
<form class="film-details__inner" action="" method="get">
<div class="film-details__top-container">
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
        <td class="film-details__term">${creatingGenreItemTitle(genre)}</td>
        <td class="film-details__cell">
        ${createGenresItem(genre)}
        </td>
      </tr>
    </tbody></table>
    <p class="film-details__film-description">
${description}
    </p>
  </div>
</div>
<section class="film-details__controls">
${createFilmDetalsControlsButton('watchlist', 'Add to watchlist', watchlist )}
${createFilmDetalsControlsButton('watched', 'Already watched', alreadyWatched)}
${createFilmDetalsControlsButton('favorite', 'Add to favorites', favorite)}
      </section>
</div>

<div class="film-details__bottom-container">
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length || ''}</span></h3>

    <ul class="film-details__comments-list">
    ${actualArrayComments()}
    </ul>

      <div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">${film.emotion ? `<img src="./images/emoji/${film.emotion}.png" width="55" height="55" alt="emoji">` : ''}</div>

        <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${film.comment ? `${film.comment}` : ''}</textarea>
        </label>

          <div class="film-details__emoji-list">
          ${createEmojisTemplate(EMOTIONS)}
          </div>
</div>
</section>
</div>
</form>
</section>`
  );
};

export default class FilmDetailsAndCommentsView extends AbstractStatefulView {

  constructor (film) {
    super();
    this._state = FilmDetailsAndCommentsView.parseMovieToData(film);

    this.setInnerHandlers();
  }

  get template() {
    return createFilmDetailsViewTemplate(this._state);
  }

  static parseMovieToData = (film) => ({...film,
    emotion: null,
    comment: null,
  });

  static parseDataToMovie = (state) => {
    const film = {...state};

    delete film.emotion;
    delete film.comment;

    return film;
  };

  setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list').addEventListener('input', this.#onEmojiCheck);
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#onCommentInput);
  };

  #onEmojiCheck = (evt) => {
    const scroll = this.element.scrollTop;
    this.updateElement({
      emotion: evt.target.value,
    });
    this.element.scrollTo(0, scroll);
    this.element.querySelectorAll('.film-details__emoji-item').forEach((emojiChecked) => {
      if (evt.target.value === emojiChecked.value ) {
        emojiChecked.setAttribute('checked', 'true');
      } else {
        emojiChecked.setAttribute('checked', 'folse');
      }
    });
  };

  #onCommentInput = (evt) => {
    evt.preventDefault();
    this._setState({
      comment: evt.target.value,
    });
  };

  _restoreHandlers = () => {
    this.setInnerHandlers();
    this.onSetFavoriteClick(this._callback.isFavoriteClick);
    this.onSetWatchedClick(this._callback.watchedClick);
    this.onSetWatchlistClick(this._callback.WatchlistClick);
    this.onSetCrossClick(this._callback.click);
  };

  onSetCrossClick = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#onCrossClickPopup);
  };

  #onCrossClickPopup = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  onSetWatchedClick = (callback) => {
    this._callback.WatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#onWatchedClick);
  };

  onSetWatchlistClick = (callback) => {
    this._callback.WatchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#onWatchlistClick);
  };

  onSetFavoriteClick = (callback) => {
    this._callback.isFavoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#onFavoriteClick);
  };

  #onWatchedClick = (evt) => {
    evt.preventDefault();
    this._callback.WatchedClick();
  };

  #onWatchlistClick = (evt) => {
    evt.preventDefault();
    this._callback.WatchlistClick();
  };

  #onFavoriteClick = (evt) => {
    evt.preventDefault();
    this._callback.isFavoriteClick();
  };
}

export {filterComments};
