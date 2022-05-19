import {createElement} from '../render.js';

const createFilmDetailsCommentsListContainerTemplate = () => '<ul class="film-details__comments-list"></ul>';
export default class FilmDetailsCommentsListContainerView {
  getTemplate() {
    return createFilmDetailsCommentsListContainerTemplate();
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