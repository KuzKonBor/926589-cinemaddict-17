import {createElement} from '../render.js';

const createFilmDetailsBottomContainerViewTemplate = () => (
  `<div class="film-details__bottom-container">
  <section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">5</span></h3>
  </section>
</div>`
);
export default class FilmDetailsBottomContainerView {
  #element = null;

  get template() {
    return createFilmDetailsBottomContainerViewTemplate();
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
