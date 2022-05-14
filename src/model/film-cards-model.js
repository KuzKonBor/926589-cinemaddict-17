import {getFilmCards} from '../fish/card.js';
import {getArrayComments} from '../fish/comment.js';
export default class FilmCardModel {
  filmCard = Array.from({length: 5}, getFilmCards);
  getFilmCard = () => this.filmCard;

  filmCardPopup = Array.from({length: 1}, getFilmCards);
  getFilmCardPopup = () => this.filmCardPopup;

  filmDetailsComment = Array.from({length: 5}, getArrayComments);
  getComments = () => this.filmDetailsComment;
}

