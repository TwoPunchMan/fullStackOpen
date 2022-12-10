const Weather = ({ weather, city }) => {
  if ( weather === null ) return null

  const icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return <div>
    <h3>Weather in {city}</h3>

    <div>
      temperature {weather.main.temp} Celcius
    </div>

    <div>
      <img src={icon} alt={`icon for ${weather.weather[0].description}`} />
    </div>

    <div>
      wind {weather.wind.speed} m/s
    </div>

  </div>

}

export default Weather;
