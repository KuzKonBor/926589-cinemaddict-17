import AbstractView from '../framework/view/abstract-view.js';

const createShowMoreButtonViewTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class FilmListShowMoreButtonView extends AbstractView {

  get template() {
    return createShowMoreButtonViewTemplate();
  }

  onSetClick = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#onClick);
  };

  #onClick = (evt) => {
    evt.preventDefault();

    this._callback.click();
  };
}
