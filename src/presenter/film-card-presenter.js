import {render, remove} from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsAndCommentsView from '../view/film-detals-and-comments-view.js';
import {siteBodyElement} from '../main.js';

export default class FilmCardPresenter {

  #filmCardListContainer = null;
  #movieCardComponent = null;
  #movieCardPopupComponent = null;

  #movieCard = null;

  constructor (filmCardListContainer) {
    this.#filmCardListContainer = filmCardListContainer;
  }

  init = (movieCard) => {
    this.#movieCard = movieCard;

    this.#movieCardComponent = new FilmCardView(movieCard);
    this.#movieCardPopupComponent = new FilmDetailsAndCommentsView(movieCard);

    render(this.#movieCardComponent, this.#filmCardListContainer);

    this.#movieCardComponent.onSetPosterClick(() => {
      this.#getRenderPopup();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    this.#movieCardPopupComponent.onSetCrossClick(() => {
      this.#getRemovePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });
  };

  destroy = () => {
    remove(this.#movieCardComponent);
    remove(this.#movieCardPopupComponent);
  };

  #getRenderPopup = () => {
    render(this.#movieCardPopupComponent, siteBodyElement);
  };

  #getRemovePopup = () => {
    this.#movieCardPopupComponent.element.remove();
  };

  #onEscKeyDown = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#getRemovePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}


/*
init = (movieCard) => {
  this.#movieCard = movieCard;

  const prevMovieCardComponent = this.#movieCardComponent;
  const prevMovieCardPopupComponent = this.#movieCardPopupComponent;

  this.#movieCardComponent = new FilmCardView(movieCard);
  this.#movieCardPopupComponent = new FilmDetailsAndCommentsView(movieCard);

  if (prevMovieCardComponent === null) {
    render(this.#movieCardComponent, this.#filmCardListContainer);
    return;
  }

  if (prevMovieCardPopupComponent === null) {
    render(this.#movieCardPopupComponent, this.#filmCardListContainer);
    return;
  }

  if (this.#filmCardListContainer.contains(prevMovieCardComponent.element)) {
    replace(this.#movieCardComponent, prevMovieCardComponent);
  }

  if (this.#filmCardListContainer.contains(prevMovieCardPopupComponent.element)) {
    replace(this.#movieCardPopupComponent, prevMovieCardPopupComponent);
  }

  this.#movieCardComponent.onSetPosterClick(() => {
    this.#getRenderPopup();
    document.addEventListener('keydown', this.#onEscKeyDown);
  });

  this.#movieCardPopupComponent.onSetCrossClick(() => {
    this.#getRemovePopup();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  });

  remove(prevMovieCardComponent);
  remove(prevMovieCardPopupComponent);
};

destroy = () => {
  remove(this.#movieCardComponent);
  remove(this.#movieCardPopupComponent);
};

#getRenderPopup = () => {
  render(this.#movieCardPopupComponent, siteBodyElement);
};

#getRemovePopup = () => {
  this.#movieCardPopupComponent.element.remove();
};

#onEscKeyDown = (evt) => {
  if(evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    this.#getRemovePopup();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }
};
}
*/
