import {createElement} from '../render.js';

const createFilmsListViewTemplate = () => '<section class="films"></section>';
export default class FilmsListView {
  getTemplate() {
    return createFilmsListViewTemplate();
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
