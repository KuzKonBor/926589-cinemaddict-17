
import {MovieCardListView, MovieCardContainerView, MovieCardView, MovieCardExtraTopRatedView, MovieCardExtraMostCommentedView} from '../view/movie-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {FilmDetailsView, FilmDetailsTopContainerView, FilmDetailsBottomContainer} from '../view/detailed-information-film-view.js';
import {filmsListView, siteMainElement, siteBodyElement} from '../main.js';
import {render} from '../render.js';


export default class BoardPresenter {

  movieCardListView = new MovieCardListView();
  filmDetailsView = new FilmDetailsView();
  movieCardContainerView = new MovieCardContainerView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(filmsListView, siteMainElement);
    render(this.movieCardListView, filmsListView.getElement());
    render(this.movieCardContainerView, this.movieCardListView.getElement());
    render(new ShowMoreButtonView(), this.movieCardListView.getElement());
    render(new MovieCardExtraTopRatedView(), filmsListView.getElement());
    render(new MovieCardExtraMostCommentedView(), filmsListView.getElement());

    for (let i = 0; i < 5; i++) {
      render(new MovieCardView (), this.movieCardContainerView.getElement());
    }

    render(this.filmDetailsView, siteBodyElement);
    render(new FilmDetailsTopContainerView(), siteBodyElement);
    render(new FilmDetailsBottomContainer(), siteBodyElement);

  };
}
