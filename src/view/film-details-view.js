import {createElement} from '../render.js';

const createFilmDetailsViewTemplate = () => '<section class="film-details"></section>';
export default class FilmDetailsView {
  #element = null;

  get template() {
    return createFilmDetailsViewTemplate();
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
