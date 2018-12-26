"use strict";
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const inputEl = document.querySelector('.search');
const suggestionsEl = document.querySelector('.suggestions');
// @ts-ignore
inputEl.addEventListener('input', displayMatches);
const cities = [];
fetch(endpoint)
    .then(response => response.json())
    .then((_cities) => cities.push(..._cities));
function findMatches(wordToMatch, cities) {
    return cities.filter((city) => {
        const cityName = city.city;
        const stateName = city.state;
        const regExp = new RegExp(wordToMatch, 'gi');
        return regExp.test(cityName) || regExp.test(stateName);
    });
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function displayMatches() {
    const matchCities = findMatches(this.value, cities);
    const html = matchCities.map((city) => {
        const { city: ct, state, population } = city;
        const regex = new RegExp(this.value, 'gi');
        const cityName = ct.replace(regex, `<span class="hl">$&</span>`);
        const stateName = state.replace(regex, `<span class="hl">$&</span>`);
        return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(population)}</span>
      </li>
    `;
    }).join('');
    // @ts-ignore
    suggestionsEl.innerHTML = html;
}
