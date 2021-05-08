/* Selectors */ //
const countriesMainDiv = document.querySelector('.countries');
const clickedCountryDiv = document.querySelector('.selected-country');
const searchCountryForm = document.querySelector('#search-country-form');
const searchCountryInput = document.querySelector('#search-country-input');

/* Store All Country Here */
let countries = [];

/* API */
const BASE_URL = `https://restcountries.eu/rest/v2`;

/* Get User Value */
searchCountryInput.addEventListener('keyup', getUserValue);
function getUserValue() {
  const value = this.value.trim();
  fetchData(value);
}

/* Fetch data from API */
function fetchData(value = false) {
  const URL = value ? `${BASE_URL}/name/${value}` : `${BASE_URL}/all`;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      countries = data;

      /* Init all code after fetch data */
      init();
    })
    .catch((err) => console.error(err));
}

/*  Display Country */
function displayCountries(countries) {
  if (!countries.length) {
    countriesMainDiv.innerHTML = '';
  } else {
    countriesMainDiv.innerHTML = countries
      .map((country) => {
        return countryCardHTML(country);
      })
      .join('');
  }
}

/* Number With Commas Function */
function numberWithCommas(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

/* HTML of Country Card */
function countryCardHTML(country) {
  return /*html*/ `
      <div class="col-lg-6 col-xl-4 country mb-4">
        <div class="card">
          <img
            src="https://restcountries.eu/data/${country.alpha3Code.toLowerCase()}.svg"
            alt="country"
            id="flag"
            class="card-img-top"
          />
          <div class="card-body">
            <h4 class="country-name text-center mb-4">${country.name}</h4>
            <table class="table table-sm table-borderless">
              <tbody>
                <tr>
                  <td>Capital:</td>
                  <td>${country.capital}</td>
                </tr>
                <tr>
                  <td>Area:</td>
                  <td>${numberWithCommas(+country.area)}</td>
                </tr>
                <tr>
                  <td>Population:</td>
                  <td>${numberWithCommas(country.population)}</td>
                </tr>
                <tr>
                  <td>Region:</td>
                  <td>${country.region}</td>
                </tr>
              </tbody>
            </table>
            <div class="text-center mt-4">
              <button onclick="displayClickedCountry('${
                country.alpha3Code
              }')" type="button" class="btn btn-primary">Get Details</button>
            </div>
          </div>
        </div>
      </div>`;
}

/* Display Clicked Country */
function displayClickedCountry(alpha3Code) {
  const clickedCountry = countries.filter(
    (country) => country.alpha3Code === alpha3Code
  );
  clickedCountryDiv.innerHTML = clickedCountry.map((country) =>
    clickedCountryCardHTML(country)
  );
}

/* HTML of Clicked Country Card */
function clickedCountryCardHTML(country) {
  return /*html*/ `
      <div class="col-12">
      <h4 class="d-md-none py-3">Country Details:</h4>
        <div class="card">
          <img
            src="https://restcountries.eu/data/${country.alpha3Code.toLowerCase()}.svg"
            alt="country"
            id="flag"
            class="card-img-top"
          />
          <div class="card-body">
            <h4 class="country-name text-center mb-4">${country.name}</h4>
            <table class="table table-sm table-borderless">
              <tbody>
                <tr>
                  <td>Native Name:</td>
                  <td>${country.nativeName}</td>
                </tr>
                <tr>
                  <td>Capital:</td>
                  <td>${country.capital}</td>
                </tr>
                <tr>
                  <td>Area:</td>
                  <td>${numberWithCommas(+country.area)}</td>
                </tr>
                <tr>
                  <td>Population:</td>
                  <td>${numberWithCommas(country.population)}</td>
                </tr>
                <tr>
                  <td>Region:</td>
                  <td>${country.region}</td>
                </tr>
                <tr>
                  <td>Sub Region:</td>
                  <td>${country.subregion}</td>
                </tr>
                <tr>
                  <td>Demonym:</td>
                  <td>${country.demonym}</td>
                </tr>
                <tr>
                  <td>Alpha-2 & Alpha-3 Code:</td>
                  <td>${country.alpha2Code} & ${country.alpha3Code}</td>
                </tr>
                <tr>
                  <td>Country Code:</td>
                  <td>${country.callingCodes[0]}</td>
                </tr>
                <tr>
                  <td>Numeric Code:</td>
                  <td>${country.numericCode}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
}

/* Init */
function init() {
  displayCountries(countries);
  displayClickedCountry('BGD');
}
fetchData();
