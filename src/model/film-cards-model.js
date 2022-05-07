//import {getRandomInteger} from '../fish/util.js';
import {getFilmCards} from '../fish/card.js';

export default class FilmCardModel {
  filmCard = Array.from({length: 5}, getFilmCards);
  getFilmCard = () => this.filmCard;
}
