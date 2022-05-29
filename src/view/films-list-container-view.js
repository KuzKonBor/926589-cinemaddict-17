import AbstractView from '../framework/view/abstract-view.js';

const createMovieCardContainerViewTemplate = () => '<div class="films-list__container"></div>';

export default class FilmListContainerView extends AbstractView {

  get template() {
    return createMovieCardContainerViewTemplate();
  }
}
