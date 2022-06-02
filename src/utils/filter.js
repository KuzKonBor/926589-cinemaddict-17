import {FilterType} from '../fish/const.js';

const filter = {
  [FilterType.ALL]: (filmCards) => filmCards.filter((filmCard) => filmCard),
  [FilterType.WATCHLIST]: (filmCards) => filmCards.filter((filmCard) => filmCard.userDetails.watchlist === true),
  [FilterType.HISTORY]: (filmCards) => filmCards.filter((filmCard) => filmCard.userDetails.alreadyWatched === true),
  [FilterType.FAVORITES]: (filmCards) => filmCards.filter((filmCard) => filmCard.userDetails.favorite === true),
};

export {filter};
