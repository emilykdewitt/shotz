import locationsData from '../../helpers/data/locationsData';
import util from '../../helpers/util';

import './locations.scss';

let locations = [];

const domStringBuilder = () => {
  let domString = '';
  domString += '<h2>Locations:</h2>';
  domString += '<div class="row">';
  locations.forEach((location) => {
    domString += '<div class="col-sm-6 col-md-4 col-lg-2">';
    domString += `<div id="${location.id}" class="card text-center">`;
    domString += `<div class="card-header bg-info">${location.name}</div>`;
    domString += `<img class="img-thumbnail" src="${location.imageUrl}">`;
    domString += `<p>${location.address}</p>`;
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  util.printToDom('locations', domString);
};

const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((resp) => {
      const locationResults = resp.data.locations;
      locations = locationResults;
      domStringBuilder();
    })
    .catch(err => console.error(err));
};

export default { initializeLocations };
