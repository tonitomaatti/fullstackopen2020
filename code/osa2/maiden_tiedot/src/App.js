import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Language = ({language}) => {
  return(
    <li>{language}</li>
  )
}

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
      <h2>languages</h2>
        <ul>
          {country.languages.map((language) =>
            <Language key={language.name} language={language.name} />
          )}
        </ul>
      <img src={country.flag} width="128" height="128" ></img>
    </div>
  )
}

const CountryName = ({name, setFilter}) => {
  return (
    <div>
      {name}
      <button onClick={() => setFilter(name)} >
        show
      </button>
    </div>
  )
}

const Countries = ({countries, setFilter}) => {

  if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  }

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  return (
    <div>
      {countries.map((country) =>
        <CountryName key={country.name} name={country.name} setFilter={setFilter} />
      )}
    </div>
  )
}


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [] )

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = countries.filter(
    c => c.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      find countries
      <input value={filter} onChange={handleFilterChange}/>
      <Countries countries={filteredCountries} setFilter={setFilter} />
    </div>
  )
}

export default App
