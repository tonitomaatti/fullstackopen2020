import React from 'react'

const Weather = ({weather}) => {
  if (weather === null) {
    return null
  }
  
  if (weather === 'no_key' ) {
    return (
      <div>Provide https://weatherstack.com/ API KEY as env variable to get weather information</div>
    )
  }

  if (weather.current === undefined) {
    return (
      <div>Can't fetch weather. Bad API key?</div>
    )
  }

  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <div><b>temperature:</b> {weather.current.temperature} </div>
      <div><img src={weather.current.weather_icons[0]} width="64" height="64" alt={weather.current.weather_descriptions[0]} ></img></div>
      <div><b>wind:</b> {weather.current.wind_speed} <b>direction:</b> {weather.current.wind_dir}</div>
    </div>
  )
}

export default Weather