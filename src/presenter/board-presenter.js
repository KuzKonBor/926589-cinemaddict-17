import MovieCardListView from '../view/films-list-view.js';
import FilmsListView from '../view/films-view.js';
import MovieCardContainerView from '../view/films-list-container-view.js';
import MovieCardView from '../view/film-card-view.js';
import MovieCardExtraTopRatedView from '../view/films-list-extra-top-rated-view.js';
import MovieCardExtraMostCommentedView from '../view/films-list-extra-most-commented-view.js';
import ShowMoreButtonView from '../view/films-list-show-more-button-view.js';
import FilmDetailsView from '../view/film-detals-and-comments-view.js';
import {createFilmDetailsCommentTemplate} from '../view/comments-view.js';
import FilmCardModel from '../model/film-cards-model.js';
import NoFilmCardView from '../view/no-film-card-view.js';
import {siteBodyElement} from '../main.js';
import {render} from '../render.js';

const filmCardModelComments = new FilmCardModel();
const boardFilmComment = [...filmCardModelComments.comments];
const actualArrayComments = () => createFilmDetailsCommentTemplate(boardFilmComment);

const filmCardCountPerStep = 5;
export default class BoardPresenter {
  #filmCardModel = null;
  #boardContainer = null;

  #filmsListView = new FilmsListView();
  #movieCardListView = new MovieCardListView();
  #movieCardContainerView = new MovieCardContainerView();
  #showMoreButtonView = new ShowMoreButtonView();
  #boardFilmCard = [];
  #renderFilmCard = filmCardCountPerStep;

  constructor(boardContainer, filmCardModel) {
    this.#boardContainer = boardContainer;
    this.#filmCardModel = filmCardModel;
  }

  init = () => {
    this.#boardFilmCard = [...this.#filmCardModel.filmCard];
    this.#renderBoard();
  };

  #onLoadMoreButtonClick = (evt) => {
    evt.preventDefault();

    this.#boardFilmCard
      .slice(this.#renderFilmCard, this.#renderFilmCard + filmCardCountPerStep)
      .forEach((filmCard) => this.#renderMovieCard(filmCard));

    this.#renderFilmCard += filmCardCountPerStep;

    if (this.#renderFilmCard >= this.#boardFilmCard.length) {
      this.#showMoreButtonView.element.remove();
      this.#showMoreButtonView.removeElement();
    }
  };

  #renderMovieCard = (movieCard) => {
    const movieCardComponent = new MovieCardView(movieCard);
    const movieCardPopupComponent = new FilmDetailsView(movieCard);

    const getRenderPopup = () => {
      render(movieCardPopupComponent, siteBodyElement);
    };

    const getRemovePopup = () => {
      movieCardPopupComponent.element.remove();
    };

    const onEscKeyDown = (evt) => {
      if(evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        getRemovePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    movieCardComponent.element.querySelector('.film-card__poster').addEventListener('click', (evt) => {
      evt.preventDefault();
      getRenderPopup();
      document.addEventListener('keydown', onEscKeyDown);
    });

    movieCardPopupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      getRemovePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(movieCardComponent, this.#movieCardContainerView.element);
  };

  #renderBoard = () => {
    render(this.#filmsListView, this.#boardContainer);

    if (this.#boardFilmCard.every((filmCard) => filmCard.isArchive)) {
      render(new NoFilmCardView(), this.#filmsListView.element);
    } else {
      render(this.#movieCardListView, this.#filmsListView.element);
      render(this.#movieCardContainerView, this.#movieCardListView.element);
      render(new MovieCardExtraTopRatedView(), this.#filmsListView.element);
      render(new MovieCardExtraMostCommentedView(), this.#filmsListView.element);

      for (let i = 0; i < Math.min(this.#boardFilmCard.length, filmCardCountPerStep); i++) {
        this.#renderMovieCard(this.#boardFilmCard[i]);
      }
      if (this.#boardFilmCard.length > filmCardCountPerStep) {
        render(this.#showMoreButtonView, this.#movieCardListView.element);

        this.#showMoreButtonView.element.addEventListener('click', this.#onLoadMoreButtonClick);
      }
    }
  };
}

export {actualArrayComments};
