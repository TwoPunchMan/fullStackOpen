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
  const [view, setView] = useState(<div></div>);
  const [weatherData, setWeatherData] = useState({});

  const api_key = process.env.REACT_APP_API_KEY;

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      });
  }

  const getCountryWeatherData = (lat, lon) => {
    let data;
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
      .then(response => {
        setWeatherData(response.data);
        console.log(data);
        return data;
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
        setView(listCountryStats(matchCountries[0]));
      } else if (countriesListLength <= 10 && countriesListLength > 1) {
        setView(listMatchCountries());
      } else {
        setView(tooManyMatchesMsg());
      }
    } else {
      setView(listNothing());
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
        <Country country={country} showStats={listCountryStats} renderState={setView} getWeather={getCountryWeatherData}/>
      </div>
    )

  const listCountryStats = (country) => {
    const [lat, lon] = country.capitalInfo.latlng;
    const weatherData = getCountryWeatherData(lat, lon);
    console.log(weatherData);
    const temp = weatherData.main.temp;

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
        <h2>Weather in {country.capital[0]}</h2>
        <div>
          <div>
            temperature {temp} Celsius
          </div>
          <img src="" alt="weather icon" />
          <div>
            wind
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Filter search={searchTerm} onChangeFunc={handleSearchChange} />
      <Display render={view} />
    </div>
  );
}

export default App;
