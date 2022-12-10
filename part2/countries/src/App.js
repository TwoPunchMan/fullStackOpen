import { useState, useEffect } from 'react';
import axios from 'axios';

import CountryList from './components/CountryList';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getCountriesData = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      });
  }

  useEffect(getCountriesData, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase()
      .includes(searchTerm.toLowerCase()));

  return (
    <div>
      find countries
      <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
      <CountryList countries={filteredCountries} setFilter={setSearchTerm} />
    </div>
  );
}

export default App;
