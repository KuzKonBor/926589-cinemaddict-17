import MovieCardListView from '../view/films-list-view.js';
import FilmsListView from '../view/films-view.js';
import MovieCardContainerView from '../view/films-list-container-view.js';
import MovieCardView from '../view/film-card-view.js';
import MovieCardExtraTopRatedView from '../view/films-list-extra-top-rated-view.js';
import MovieCardExtraMostCommentedView from '../view/films-list-extra-most-commented-view.js';
import ShowMoreButtonView from '../view/films-list-show-more-button-view.js';
import FilmDetailsNewCommentContainerView from '../view/film-details-new-comment.view.js';
import FilmDetailsCommentsListContainerView from '../view/film-details-comments-list-view.js';
import FilmDetailsFormView from '../view/film-details-form-view.js';
import FilmDetailsView from '../view/film-details-view.js';
//import FilmDetailsTopContainerView from '../view/film-details-top-container-popup-view.js';
import FilmDetailsBottomContainerView from '../view/film-details-bottom-container-view.js';
//import FilmDetailsComentsView from '../view/film-details-comment-view.js';
import {siteMainElement, /*siteBodyElement*/} from '../main.js';
import {render} from '../render.js';
export default class BoardPresenter {
  #boardContainer = null;
  #filmCardModel = null;

  #filmsListView = new FilmsListView();
  #movieCardListView = new MovieCardListView();
  #filmDetailsView = new FilmDetailsView();
  #movieCardContainerView = new MovieCardContainerView();
  #filmDetailsBottomContainerView = new FilmDetailsBottomContainerView();
  #filmDetailsFormView = new FilmDetailsFormView();
  #filmDetailsCommentsListContainerView = new FilmDetailsCommentsListContainerView();
  #filmDetailsNewCommentContainerView = new FilmDetailsNewCommentContainerView();

  #boardfilmCard = [];
  #boardfilmComment= [];

  init = (boardContainer, filmCardModel) => {
    this.#boardContainer = boardContainer;
    this.#filmCardModel = filmCardModel;
    this.#boardfilmCard = [...this.#filmCardModel.filmCard];
    //this.#boardfilmCardPopup = [...this.#filmCardModel.getFilmCardPopup()];
    this.#boardfilmComment = [...this.#filmCardModel.comments];

    render(this.#filmsListView, siteMainElement);
    render(this.#movieCardListView, this.#filmsListView.element);
    render(this.#movieCardContainerView, this.#movieCardListView.element);
    render(new ShowMoreButtonView(), this.#movieCardListView.element);
    render(new MovieCardExtraTopRatedView(), this.#filmsListView.element);
    render(new MovieCardExtraMostCommentedView(), this.#filmsListView.element);

    for (let i = 0; i < this.#boardfilmCard.length; i++) {
      render(new MovieCardView (this.#boardfilmCard[i]), this.#movieCardContainerView.element);
    }
    /*
    render(this.#filmDetailsView, siteBodyElement);
    render(this.#filmDetailsFormView, this.#filmDetailsView.element);

    for (let i = 0; i < this.#boardfilmCardPopup.length; i++) {
      render(new FilmDetailsTopContainerView(this.#boardfilmCardPopup[0]), this.#filmDetailsFormView.element());
    }

    render(this.#filmDetailsBottomContainerView, this.#filmDetailsFormView.element);

    render(this.#filmDetailsCommentsListContainerView, this.#filmDetailsBottomContainerView.element);

    for (let i = 0; i < this.#boardfilmComment.length; i++) {
      render(new FilmDetailsComentsView(this.#boardfilmComment[i]), this.#filmDetailsCommentsListContainerView.element);
    }

    render(this.#filmDetailsNewCommentContainerView, this.#filmDetailsBottomContainerView.element);
*/
  };
}
