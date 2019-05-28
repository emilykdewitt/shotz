import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';

import './movies.scss';

let movies = [];

const domStringBuilder = () => {
  let domString = '';
  domString += '<div class="row">';
  movies.forEach((movie) => {
    domString += `<div id="${movie.id}" class="col col-sm-12 col-md-6 col-lg-4">`;
    domString += `<div id="${movie.id}Card" class="card movieCard">`;
    domString += `<h4 class="card-header bg-info">${movie.name}</h4>`;
    domString += `<p>Genre: ${movie.genre}</p>`;
    domString += `<p>Release Date: ${movie.releaseDate}</p>`;
    domString += `<p>Description: ${movie.description}</p>`;
    domString += `<p>${movie.locations.length} locations</p>`;
    domString += `<button class="btn btn-info singleMovieBtn" id="${movie.id}">More info</button>`;
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  util.printToDom('movies', domString);
};

const filterLocationsByMovie = (buttonId) => {
  const locationCardsArray = Array.from(document.getElementsByClassName('locationCard'));
  locationCardsArray.forEach((card) => {
    card.classList.add('hide');
  });
  moviesData.getMoviesData()
    .then((resp) => {
      const movieResults = resp.data.movies;
      movieResults.forEach((movie) => {
        if (buttonId === movie.id) {
          const locationsForMovie = movie.locations;
          let i = 0;
          for (i = 0; i < locationsForMovie.length; i += 1) {
            // eslint-disable-next-line no-loop-func
            locationCardsArray.forEach((card) => {
              if (locationsForMovie[i] === card.id) {
                card.classList.remove('hide');
              }
            });
          }
        }
      });
    })
    .catch(err => console.error(err));
};

const singleMovieFilter = (e) => {
  document.getElementById('filters').classList.add('hide');
  document.getElementById('backBtn').classList.remove('hide');
  const selectedButtonId = e.target.id;
  const movieCardsArray = Array.from(document.getElementsByClassName('movieCard'));
  movieCardsArray.forEach((card) => {
    if (card.id !== `${selectedButtonId}Card`) {
      card.classList.add('hide');
    }
  });
  filterLocationsByMovie(selectedButtonId);
};

const singleMovieListener = () => {
  const allButtons = document.getElementsByClassName('singleMovieBtn');
  let i = 0;
  for (i = 0; i < allButtons.length; i += 1) {
    allButtons[i].addEventListener('click', singleMovieFilter);
  }
};

const showAllMovies = () => {
  const movieCardsArray = Array.from(document.getElementsByClassName('movieCard'));
  const locationCardsArray = Array.from(document.getElementsByClassName('locationCard'));
  locationCardsArray.forEach((card) => {
    card.classList.remove('hide');
  });
  document.getElementById('filters').classList.remove('hide');
  document.getElementById('backBtn').classList.add('hide');
  movieCardsArray.forEach((card) => {
    card.classList.remove('hide');
  });
};

const backBtnListener = () => {
  document.getElementById('backBtn').addEventListener('click', showAllMovies);
};

const initializeMovies = () => {
  moviesData.getMoviesData()
    .then((resp) => {
      const movieResults = resp.data.movies;
      movies = movieResults;
      domStringBuilder();
      singleMovieListener();
      backBtnListener();
    })
    .catch(err => console.error(err));
};

export default { initializeMovies };
