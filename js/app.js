// Selectors
const countriesMainDiv = document.querySelector('.countries');
const selectedCountryDiv = document.querySelector('.selected-country');
const searchCountry = document.querySelector('#search-country-input');

// API URL
const URL = `https://restcountries.eu/rest/v2/all`;

// Store All Country
let countries = [];

// Fetch data from API
fetch(URL)
  .then((response) => response.json())
  .then((data) => (countries = data))
  .catch((err) => console.log(err));

// Number With Commas Function
function numberWithCommas(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

// Find Matched Country
function findMatchesCountry(wordToMatch) {
  return countries.filter((country) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return country.name.match(regex) || country.capital.match(regex);
  });
}

// Display Country
function displayCountries(countries = false) {
  // if input in blank
  if (!countries) {
    const displayedAllCountry = countries
      .map((country) => {
        return countryCardHTML(country);
      })
      .join('');
    countriesMainDiv.innerHTML = displayedAllCountry;
  }
  // if user provide input
  else {
    const matchedCountry = findMatchesCountry(searchCountry.value.trim());
    const displayedMatchedCountry = matchedCountry
      .map((country) => {
        return countryCardHTML(country);
      })
      .join('');
    countriesMainDiv.innerHTML = displayedMatchedCountry;
  }
}

// HTML of Country Card
function countryCardHTML(country) {
  return `
      <div class="col-lg-6 col-xxl-4 country mb-4">
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

// Find Matched Country
function findClickedCountry(wordToMatch) {
  return countries.filter((country) => {
    return country.alpha3Code == wordToMatch;
  });
}

function displayClickedCountry(c) {
  const clickedCountry = findClickedCountry(c);
  const displayClickedCountry = clickedCountry
    .map((country) => {
      return clickedCountryCardHTML(country);
    })
    .join('');
  selectedCountryDiv.innerHTML = displayClickedCountry;
}

// HTML of Clicked Country Card
function clickedCountryCardHTML(country) {
  return `
      <div class="col-12">
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

// Call Display Countries and Display Clicked Country Function OnLoad
window.onload = function () {
  displayCountries(countries);
  displayClickedCountry('BGD');
};

// Call Display Countries Function On Keyup of input
searchCountry.addEventListener('keyup', displayCountries);
