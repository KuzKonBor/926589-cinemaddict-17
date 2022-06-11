import {render, replace, remove} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsAndCommentsView from '../view/film-detals-and-comments-view.js';
import {siteBodyElement} from '../main.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  DETALS: 'DETALS',
};
export default class FilmCardPresenter {
  #filmCardListContainer = null;
  #movieCardComponent = null;
  #movieCardPopupComponent = null;
  #changeData = null;
  #changeMode = null;

  #movieCard = null;
  #mode = Mode.DEFAULT;

  constructor (filmCardListContainer, changeData, changeMode) {
    this.#filmCardListContainer = filmCardListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (movieCard) => {
    this.#movieCard = movieCard;

    const prevMovieCardComponent = this.#movieCardComponent;
    const prevMovieCardPopupComponent = this.#movieCardPopupComponent;

    this.#movieCardComponent = new FilmCardView(this.#movieCard);
    this.#movieCardPopupComponent = new FilmDetailsAndCommentsView(this.#movieCard);

    this.#movieCardComponent.onSetPosterClick(this.#onPosterClick);
    this.#movieCardComponent.onSetAddToWatchlistClick(this.#onWatchlistClick);
    this.#movieCardComponent.onSetMarkAsWatchedClick(this.#onWatchedClick);
    this.#movieCardComponent.onSetFavoriteClickHandler(this.#onFavoriteClick);
    this.#movieCardPopupComponent.onSetCrossClick(this.#onCrossClick);

    if (prevMovieCardComponent === null) {
      render(this.#movieCardComponent, this.#filmCardListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#movieCardComponent, prevMovieCardComponent);
    }


    if (prevMovieCardPopupComponent === null) {
      render(this.#movieCardPopupComponent, siteBodyElement);
      return;
    }

    if (this.#mode === Mode.DETALS) {
      replace(this.#movieCardPopupComponent, prevMovieCardPopupComponent);
    }

    remove(prevMovieCardComponent);
    remove(prevMovieCardPopupComponent);
  };

  destroy = () => {
    remove(this.#movieCardComponent);
    remove(this.#movieCardPopupComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#getRemovePopup();
    }
  };

  #getRenderPopup = () => {
    render(this.#movieCardPopupComponent, siteBodyElement);
    this.#changeMode();
    this.#mode = Mode.DETALS;
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #getRemovePopup = () => {
    this.#movieCardPopupComponent.element.remove();
    this.#mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#getRemovePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #onPosterClick = (movieCard) => {
    this.#getRenderPopup();
    this.#changeData(movieCard);
  };

  #onCrossClick = () => {
    this.#getRemovePopup();
  };

  #onFavoriteClick = () => {
    this.#changeData({...this.#movieCard, favorite: !this.#movieCard.favorite});
  };

  #onWatchlistClick = () => {
    this.#changeData({...this.#movieCard, watchlist: !this.#movieCard.watchlist});
  };

  #onWatchedClick = () => {
    this.#changeData({...this.#movieCard, alreadyWatched: !this.#movieCard.alreadyWatched});
  };
}
