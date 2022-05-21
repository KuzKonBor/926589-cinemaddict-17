import {createElement} from '../render.js';

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

export default class FilmDetailsComentsView {
  #element = null;
  #comments = null;

  constructor (comments){
    this.#comments = comments;
  }

  get template() {
    return getFilmDetailsComment(this.#comments);
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

export {filterComments};
