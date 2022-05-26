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
import {siteMainElement, siteBodyElement} from '../main.js';
import {render} from '../render.js';


const filmCardModelComments = new FilmCardModel();
const boardFilmComment = [...filmCardModelComments.comments];
const actualArrayComments = () => createFilmDetailsCommentTemplate(boardFilmComment);

export default class BoardPresenter {
  #filmCardModel = null;
  #boardContainer = null;

  #filmsListView = new FilmsListView();
  #movieCardListView = new MovieCardListView();
  #movieCardContainerView = new MovieCardContainerView();

  #boardFilmCard = [];

  init = (boardContainer, filmCardModel) => {

    this.#filmCardModel = filmCardModel;
    this.#boardFilmCard = [...this.#filmCardModel.filmCard];

    render(this.#filmsListView, siteMainElement);
    render(this.#movieCardListView, this.#filmsListView.element);
    render(this.#movieCardContainerView, this.#movieCardListView.element);
    render(new ShowMoreButtonView(), this.#movieCardListView.element);
    render(new MovieCardExtraTopRatedView(), this.#filmsListView.element);
    render(new MovieCardExtraMostCommentedView(), this.#filmsListView.element);

    for (let i = 0; i < this.#boardFilmCard.length; i++) {
      this.#renderMovieCard(this.#boardFilmCard[i]);
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
}

export {actualArrayComments};
