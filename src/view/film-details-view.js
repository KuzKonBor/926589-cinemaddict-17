import {createElement} from '../render.js';

const createFilmDetailsViewTemplate = () => '<section class="film-details"></section>';
export default class FilmDetailsView {
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
