import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListViewTemplate = () => '<section class="films"></section>';
export default class FilmsView extends AbstractView {

  get template() {
    return createFilmsListViewTemplate();
  }
}
