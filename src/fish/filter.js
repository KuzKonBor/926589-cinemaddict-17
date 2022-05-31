import {filter} from '../utils/filter.js';

export const generateFilter = (filmCard) => Object.entries(filter).map(
  ([filterName, filterFilmCard]) => ({
    name: filterName,
    count: filterFilmCard(filmCard).length,
  }),
);
