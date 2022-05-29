import AbstractView from '../framework/view/abstract-view.js';

const createShowMoreButtonViewTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class FilmListShowMoreButtonView extends AbstractView {

  get template() {
    return createShowMoreButtonViewTemplate();
  }
}
