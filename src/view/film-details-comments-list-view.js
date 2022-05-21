import {createElement} from '../render.js';

const createFilmDetailsCommentsListContainerTemplate = () => '<ul class="film-details__comments-list"></ul>';
export default class FilmDetailsCommentsListContainerView {
  #element = null;

  get template() {
    return createFilmDetailsCommentsListContainerTemplate();
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
