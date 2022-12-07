import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import Country from './components/Country';
import Display from './components/Display';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [matchCountries, setMatchCountries] = useState(countries);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterActive, setFilterStatus] = useState(false);
  const [renderFunction, setRenderFunction] = useState(<div></div>);

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      });
  }

  useEffect(hook, []);

  const filterCountries = () => {
    const countryMatches = countries.filter(country =>
      country.name.common.toLowerCase()
        .indexOf(searchTerm.toLowerCase()) !== -1
      );

    setMatchCountries(countryMatches);
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);

    if (searchTerm.length === 0) {
      setFilterStatus(false);
      setMatchCountries(countries);
    } else {
      setFilterStatus(true);
      filterCountries();
    }

    showCountries();
  }

  const showCountries = () => {
    const countriesListLength = matchCountries.length;

    if (isFilterActive) {
      if (countriesListLength === 1) {
        setRenderFunction(listCountryStats(matchCountries[0]));
      } else if (countriesListLength <= 10 && countriesListLength > 1) {
        setRenderFunction(listMatchCountries());
      } else {
        setRenderFunction(tooManyMatchesMsg());
      }
    } else {
      setRenderFunction(listNothing());
    }
  }

  const listNothing = () => <div></div>

  const tooManyMatchesMsg = () =>
    <div>
      Too many matches, specify another filter
    </div>

  const listMatchCountries = () =>
    matchCountries.map(country =>
      <div key={country.name.common}>
        <Country country={country} showStats={listCountryStats} renderState={setRenderFunction} />
      </div>
    )

  const listCountryStats = (country) => {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>
          <div>capital {country.capital[0]}</div>
          <div>area {country.area}</div>
        </div>
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages)
            .map(lang =>
              <li key={lang}>{lang}</li>
            )}
        </ul>
        <img src={country.flags['png']} alt="country flag" />
      </div>
    )
  }

  return (
    <div>
      <Filter search={searchTerm} onChangeFunc={handleSearchChange} />
      <Display render={renderFunction} />
    </div>
  );
}

export default App;
