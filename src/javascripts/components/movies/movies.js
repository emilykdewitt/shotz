import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';

import './movies.scss';

let movies = [];

const domStringBuilder = () => {
  let domString = '';
  domString += '<h2>Movies</h2>';
  domString += '<div class="row">';
  movies.forEach((movie) => {
    domString += `<div id="${movie.id}" class="col col-sm-12 col-md-6 col-lg-4">`;
    domString += `<div id="${movie.id}" class="card">`;
    domString += `<h3 class="card-header bg-info">${movie.name}</h3>`;
    domString += `<p>Genre: ${movie.genre}</p>`;
    domString += `<p>Release Date: ${movie.releaseDate}</p>`;
    domString += `<p>Description: ${movie.description}</p>`;
    domString += `<p>${movie.locations.length} locations</p>`;
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  util.printToDom('movies', domString);
};

const initializeMovies = () => {
  moviesData.getMoviesData()
    .then((resp) => {
      const movieResults = resp.data.movies;
      movies = movieResults;
      domStringBuilder();
    })
    .catch(err => console.error(err));
};

export default { initializeMovies };
