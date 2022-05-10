import {getFilmCards} from '../fish/card.js';
import {getComment} from '../fish/comment.js';
export default class FilmCardModel {
  filmCard = Array.from({length: 5}, getFilmCards);
  getFilmCard = () => this.filmCard;

  filmCardPopup = Array.from({length: 1}, getFilmCards);
  getFilmCardPopup = () => this.filmCardPopup;

  filmDetailsComment = Array.from({length: 5}, getComment);
  getComments = () => this.filmDetailsComment;
}
