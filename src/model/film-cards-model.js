import {getFilmCard} from '../fish/card.js';
import {commentsArray} from '../fish/data.js';
import {filterComments} from '../view/film-detals-and-comments-view.js';

const InitialNumberOfMovieCards = 9;

export default class FilmCardModel {
  #filmCard = Array.from({length: InitialNumberOfMovieCards}, getFilmCard);
  get filmCard() {
    return this.#filmCard;
  }

  #filmDetailsComment = filterComments(commentsArray, getFilmCard);
  get comments() {
    return this.#filmDetailsComment;
  }
}

