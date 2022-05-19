import MovieCardListView from '../view/films-list-view.js';
import MovieCardContainerView from '../view/films-list-container-view.js';
import MovieCardView from '../view/film-card-view.js';
import MovieCardExtraTopRatedView from '../view/films-list-extra-top-rated-view.js';
import MovieCardExtraMostCommentedView from '../view/films-list-extra-most-commented-view.js';
import ShowMoreButtonView from '../view/films-list-show-more-button-view.js';
import FilmDetailsNewCommentContainerView from '../view/film-details-new-comment.view.js';
import FilmDetailsCommentsListContainerView from '../view/film-details-comments-list-view.js';
import FilmDetailsFormView from '../view/film-details-form-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmDetailsTopContainerView from '../view/film-details-top-container-popup-view.js';
import FilmDetailsBottomContainerView from '../view/film-details-bottom-container-view.js';
import FilmDetailsComentsView from '../view/film-details-comment-view.js';
import {filmsListView, siteMainElement, siteBodyElement} from '../main.js';
//import {getFilmComments} from '../view/film-details-comment-view.js';
import {render} from '../render.js';

//import {getFilmCards} from '../fish/card.js';
//import {arrayComments} from '../fish/array-comment-view.js';

export default class BoardPresenter {

  movieCardListView = new MovieCardListView();
  filmDetailsView = new FilmDetailsView();
  movieCardContainerView = new MovieCardContainerView();

  filmDetailsBottomContainerView = new FilmDetailsBottomContainerView();
  filmDetailsFormView = new FilmDetailsFormView();
  filmDetailsCommentsListContainerView = new FilmDetailsCommentsListContainerView();
  filmDetailsNewCommentContainerView = new FilmDetailsNewCommentContainerView();

  init = (boardContainer, filmCardModel) => {
    this.boardContainer = boardContainer;
    this.filmCardModel = filmCardModel;
    this.boardfilmCard = [...this.filmCardModel.getFilmCard()];
    this.boardfilmCardPopup = [...this.filmCardModel.getFilmCardPopup()];
    this.boardfilmComment = [...this.filmCardModel.getComments()];

    render(filmsListView, siteMainElement);
    render(this.movieCardListView, filmsListView.getElement());
    render(this.movieCardContainerView, this.movieCardListView.getElement());
    render(new ShowMoreButtonView(), this.movieCardListView.getElement());
    render(new MovieCardExtraTopRatedView(), filmsListView.getElement());
    render(new MovieCardExtraMostCommentedView(), filmsListView.getElement());

    for (let i = 0; i < this.boardfilmCard.length; i++) {
      render(new MovieCardView (this.boardfilmCard[i]), this.movieCardContainerView.getElement());
    }

    render(this.filmDetailsView, siteBodyElement);
    render(this.filmDetailsFormView, this.filmDetailsView.getElement());

    for (let i = 0; i < this.boardfilmCardPopup.length; i++) {
      render(new FilmDetailsTopContainerView(this.boardfilmCardPopup[0]), this.filmDetailsFormView.getElement());
    }
    render(this.filmDetailsBottomContainerView, this.filmDetailsFormView.getElement());
    render(this.filmDetailsCommentsListContainerView, this.filmDetailsBottomContainerView.getElement());

    for (let i = 0; i < this.boardfilmComment.length; i++) {
      render(new FilmDetailsComentsView(this.boardfilmComment[i]), this.filmDetailsCommentsListContainerView.getElement());
    }

    render(this.filmDetailsNewCommentContainerView, this.filmDetailsBottomContainerView.getElement());
  };
}
