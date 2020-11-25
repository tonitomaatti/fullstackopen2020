import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Weather from './components/Weather'
import {Country, Countries} from './components/Countries'
import Filter from './components/Filter'
  

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ weather, setWeather ] = useState(null)
  

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [] )

  const filteredCountries = countries.filter(
    c => c.name.toLowerCase().includes(filter.toLowerCase()))

  
  useEffect(() => {
    if (filteredCountries.length === 1){
      const api_key = process.env.REACT_APP_API_KEY
      if ( api_key === undefined ) {
        setWeather('no_key')
      } else {
        const capital = filteredCountries[0].capital
        const weather_url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
      
        axios
          .get(weather_url)
          .then(response => {
            setWeather(response.data)
          })
      }
    }
  // eslint-disable-next-line
  }, [filteredCountries.length] )
  

  if (filteredCountries.length === 1){
    return (
      <div>
        <Filter filter={filter} setFilter={setFilter} />
        <Country country={filteredCountries[0]} />
        <Weather weather={weather} />
      </div>
    )
  }
  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Countries countries={filteredCountries} setFilter={setFilter} />
    </div>
  )
}

export default App
