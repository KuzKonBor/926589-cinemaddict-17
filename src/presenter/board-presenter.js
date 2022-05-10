import {MovieCardListView, MovieCardContainerView, MovieCardView, MovieCardExtraTopRatedView, MovieCardExtraMostCommentedView} from '../view/movie-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {FilmDetailsNewCommentContainer, FilmDetailsUlContainer, FilmDetailsFormView,FilmDetailsView, FilmDetailsTopContainerView,FilmDetailsBottomContainer, FilmDetailsComentsView} from '../view/detailed-information-film-view.js';
import {filmsListView, siteMainElement, siteBodyElement} from '../main.js';
import {render} from '../render.js';


export default class BoardPresenter {

  movieCardListView = new MovieCardListView();
  filmDetailsView = new FilmDetailsView();
  movieCardContainerView = new MovieCardContainerView();
  filmDetailsBottomContainer = new FilmDetailsBottomContainer();
  filmDetailsFormView = new FilmDetailsFormView();
  filmDetailsUlContainer = new FilmDetailsUlContainer();
  filmDetailsNewCommentContainer = new FilmDetailsNewCommentContainer();

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
    render(this.filmDetailsBottomContainer, this.filmDetailsFormView.getElement());
    render(this.filmDetailsUlContainer, this.filmDetailsBottomContainer.getElement());

    for (let i = 0; i < this.boardfilmComment.length; i++) {
      render(new FilmDetailsComentsView(this.boardfilmComment[i]), this.filmDetailsUlContainer.getElement());
    }

    render(this.filmDetailsNewCommentContainer, this.filmDetailsBottomContainer.getElement());
  };
}
