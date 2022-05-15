import {createElement} from '../render.js';
import {humanizeReleaseDate} from '../fish/util.js';

const createFilmDetailsViewTemplate = () => (
  `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
  </form>
</section>`
);
class FilmDetailsView {
  getTemplate() {
    return createFilmDetailsViewTemplate();
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
const createFilmDetailsFormViewTemplate = () => (
  `<form class="film-details__inner" action="" method="get">
  </form>`
);
class FilmDetailsFormView {
  getTemplate() {
    return createFilmDetailsFormViewTemplate();
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
class FilmDetailsTopContainerView {
  constructor (film){
    this.film = film;
  }

  getTemplate() {
    return createFilmDetailsTopContainerViewTemplate(this.film);
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


const getFilmDetailsComment = (comments) => {
  const {id, author, comment, date, emotion} = comments;

  return `<li class="film-details__comment" comment-id="${id}">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${date}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`;
};
class FilmDetailsComentsView {
  constructor (comments){
    this.comments = comments;
  }

  getTemplate() {
    return getFilmDetailsComment(this.comments);
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


const createFilmDetailsBottomContainerViewTemplate = () => (
  `<div class="film-details__bottom-container">
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">5</span></h3>
  </section>
</div>`
);
class FilmDetailsBottomContainerView {
  getTemplate() {
    return createFilmDetailsBottomContainerViewTemplate();
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


const createFilmDetailsUlViewTemplate = () => '<ul class="film-details__comments-list"></ul>';
class FilmDetailsUlContainerView {
  getTemplate() {
    return createFilmDetailsUlViewTemplate();
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


const createFilmDetailsNewCommentContainerViewTemplate = () => (
  `<div class="film-details__new-comment">
      <div class="film-details__add-emoji-label"></div>
      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
      </div>
    </div>`
);
class FilmDetailsNewCommentContainerView {
  getTemplate() {
    return createFilmDetailsNewCommentContainerViewTemplate();
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


export{FilmDetailsNewCommentContainerView, FilmDetailsUlContainerView, FilmDetailsFormView, FilmDetailsView, FilmDetailsTopContainerView, FilmDetailsBottomContainerView, FilmDetailsComentsView};

