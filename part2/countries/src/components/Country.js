import axios from "axios";
import { useEffect, useState } from "react";

import Weather from "./Weather";

const Country = ({ country }) => {
	const [weatherData, setWeatherData] = useState(null);
	const languages = Object.values(country.languages);
	const capital = country.capital[0];

	const getWeatherData = () => {
		const api_key = process.env.REACT_APP_API_KEY;
		const url = `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`;
		axios
			.get(url)
			.then(response => {
				setWeatherData(response.data);
			});
	}

	useEffect(getWeatherData, []);

	return (
		<div>
    <h2>{country.name.common}</h2>
    <div>capital {capital} </div>
    <div>area {country.area} </div>

    <h4>languages:</h4>
    <ul>
      {languages.map(language =>
        <li key={language}>
          {language}
        </li>
      )}
    </ul>

    <img
      src={country.flags.png}
      alt={`Flag of ${country.name.common}`}
      width={150}
    />

    <Weather weather={weatherData} city={capital} />
  </div>
	)
}

export default Country;
