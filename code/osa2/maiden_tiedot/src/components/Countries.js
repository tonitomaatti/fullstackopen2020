import React from 'react'

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
      <h2>Spoken languages</h2>
        <ul>
          {country.languages.map((language) =>
            <Language key={language.name} language={language.name} />
          )}
        </ul>
      <img src={country.flag} width="180" height="110" alt={`Flag of ${country.name}`} ></img>
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

export {Country, Countries}