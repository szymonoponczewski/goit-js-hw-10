import Notiflix from "notiflix";

const countryEl = document.querySelector(".country-list");
const countryInfoEl = document.querySelector(".country-info");
const API_URL = "https://restcountries.com/v3.1/name/";
const API_FILTER = "?fields=name,capital,population,flags,languages";

const clearFn = () => {
  countryEl.innerHTML = "";
  countryInfoEl.innerHTML = "";
};

const tooManyResults = () => {
  Notiflix.Notify.info(
    "Too many matches found. Please enter a more specific name."
  );
};

const fewResults = (country) => {
  clearFn();

  const countries = country
    .map((countryName) => {
      return `<li><img src="${countryName.flags.png}" alt="${countryName.flags.alt}" width="25" height="auto"><p> ${countryName.name.common}</p></li>`;
    })
    .join(" ");

  countryEl.innerHTML = countries;
};

const oneResult = (country) => {
  clearFn();

  const countries = country
    .map((countryName) => {
      return `
       <h2 style="font-size: 35px"><img src="${countryName.flags.png}" alt="${
        countryName.flags.alt
      } width="25" height="25"> ${countryName.name.common}</h2>
        <p><span style="font-weight: bold">Capital:</span> ${
          countryName.capital
        }</p>
        <p><span style="font-weight: bold">Population:</span> ${
          countryName.population
        }</p>
        <p><span style="font-weight: bold">Languages:</span> ${Object.values(
          countryName.languages
        ).join(", ")}</p>`;
    })
    .join(" ");

  countryInfoEl.innerHTML = countries;
};

export const fetchCountries = (name) => {
  name = name.trim(); //remove white spaces
  fetch(API_URL + name + API_FILTER)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then((country) => {
      if (country.length > 10) {
        tooManyResults(country);
      } else if (country.length >= 2 && country.length <= 10) {
        fewResults(country);
      } else if ((country.length = 1)) {
        oneResult(country);
      }
    })
    .catch(() => {
      Notiflix.Notify.failure("Oops, there is no country with that name");
      clearFn();
    });
};
