import "./css/styles.css";
import { fetchCountries } from "./fetchCountries";
import Notiflix from "notiflix";

const debounce = require("lodash.debounce");
const DEBOUNCE_DELAY = 300;

const inputEl = document.getElementById("search-box");
const countryListEl = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

inputEl.addEventListener(
  "input",
  debounce(async (ev) => {
    const countryName = ev.target.value.trim();

    if (countryName === "") {
      countryListEl.innerHTML = "";
      countryInfo.innerHTML = "";
      return;
    }

    const countries = await fetchCountries(countryName);

    if (countries.length > 10) {
      Notiflix.Notify.info(
        "Too many matches found. Please enter a more specific name."
      );
    } else {
      countryListEl.innerHTML = countries
        .map(
          (country) =>
            `<li><img height="16" src="${country.flags.png}" />${country.name.common}</li>`
        )
        .join("");
    }

    if (countries.length === 1) {
      countryInfo.innerHTML = countries
        .map(
          (country) => `
          <p><span style="font-weight: bold">Capital:</span> ${
            country.capital
          }</p>
          <p><span style="font-weight: bold">Population:</span> ${
            country.population
          }</p>
          <p><span style="font-weight: bold">Languages:</span> ${Object.values(
            country.languages
          )}</p>`
        )
        .join(", ");
    }
  }, DEBOUNCE_DELAY)
);
