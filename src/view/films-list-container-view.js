import {createElement} from '../render.js';

const createMovieCardContainerViewTemplate = () => '<div class="films-list__container"></div>';

export default class MovieCardContainerView {
  #element = null;

  get template() {
    return createMovieCardContainerViewTemplate();
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
