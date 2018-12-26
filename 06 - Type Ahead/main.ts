const endpoint: string = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const inputEl = document.querySelector<HTMLInputElement>('.search');
const suggestionsEl = document.querySelector<HTMLUListElement>('.suggestions');

// @ts-ignore
inputEl.addEventListener('input', displayMatches);

type City = {
  city: string,
  state: string,
  rank: number,
  population: number,
  growth_from_2000_to_2013?: string,
  latitude?: number,
  longitude?: number
}

const cities: City[] = [];

fetch(endpoint)
  .then(response => response.json())
  .then((_cities: City[]) => cities.push(..._cities))

function findMatches(wordToMatch: string, cities: City[]): City[] {
  return cities.filter((city: City) => {
      const cityName: string = city.city;
      const stateName: string = city.state;
      const regExp: RegExp = new RegExp(wordToMatch, 'gi');
      return regExp.test(cityName) || regExp.test(stateName);
  })
}

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches(this: HTMLInputElement) {
  const matchCities: City[] = findMatches(this.value, cities);
  const html = matchCities.map((city: City) => {
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


