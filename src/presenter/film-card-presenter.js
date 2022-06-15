/* eslint-disable no-undef */
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

    this.#movieCardComponent = new FilmCardView(movieCard);
    this.#movieCardPopupComponent = new FilmDetailsAndCommentsView(movieCard);

    this.#movieCardComponent.onSetPosterClick(this.#onPosterClick);
    this.#movieCardComponent.onSetAddToWatchlistClick(this.#onWatchlistClick);
    this.#movieCardComponent.onSetMarkAsWatchedClick(this.#onWatchedClick);
    this.#movieCardComponent.onSetFavoriteClickHandler(this.#onFavoriteClick);
    this.#movieCardPopupComponent.onSetCrossClick(this.#onCrossClick);
    this.#movieCardPopupComponent.onSetWatchlistClick(this.#onPopupWatchlistClick);
    this.#movieCardPopupComponent.onSetWatchedClick(this.#onPopupWatchedClick);
    this.#movieCardPopupComponent.onSetFavoriteClick(this.#onPopupFavoriteClick);


    if (prevMovieCardComponent === null || prevMovieCardPopupComponent === null) {
      render(this.#movieCardComponent, this.#filmCardListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#movieCardComponent, prevMovieCardComponent);
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

  #onCrossClick = () => {
    this.#getRemovePopup();
  };

  #onFavoriteClick = () => {
    favorite = this.#movieCard.userDetails.favorite;
    this.#changeData({...this.#movieCard, favorite: !this.#movieCard.userDetails.favorite});
  };

  #onWatchlistClick = () => {
    watchlist = this.#movieCard.userDetails.watchlist;
    this.#changeData({...this.#movieCard, watchlist: !this.#movieCard.userDetails.watchlist});
  };

  #onWatchedClick = () => {
    alreadyWatched = this.#movieCard.userDetails.alreadyWatched;
    this.#changeData({...this.#movieCard, alreadyWatched : !this.#movieCard.userDetails.alreadyWatched});
  };

  #onPopupFavoriteClick = () => {
    favorite = this.#movieCard.userDetails.favorite;
    this.#changeData({...this.#movieCard, favorite: !this.#movieCard.userDetails.favorite});
  };

  #onPopupWatchlistClick = () => {
    watchlist = this.#movieCard.userDetails.watchlist;
    this.#changeData({...this.#movieCard, watchlist: !this.#movieCard.userDetails.watchlist});
  };

  #onPopupWatchedClick = () => {
    alreadyWatched = this.#movieCard.userDetails.alreadyWatched;
    this.#changeData({...this.#movieCard, alreadyWatched : !this.#movieCard.userDetails.alreadyWatched});
  };

  #onPosterClick = (movieCard) => {
    this.#changeData(movieCard);
    this.#getRenderPopup();
  };
}
