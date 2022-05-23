import {getFilmCard} from '../fish/card.js';
import {commentsArray} from '../fish/data.js';
import {filterComments} from '../view/film-details-comment-view.js';
export default class FilmCardModel {
  filmCard = Array.from({length: 5}, getFilmCard);
  getFilmCard = () => this.filmCard;

  filmCardPopup = Array.from({length: 1}, getFilmCard);
  getFilmCardPopup = () => this.filmCardPopup;

  filmDetailsComment = filterComments(commentsArray, getFilmCard);
  getComments = () => this.filmDetailsComment;
}

