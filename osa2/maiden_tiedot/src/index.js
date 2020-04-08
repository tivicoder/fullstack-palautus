import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const App = () => {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])

  const filterChanged = (event) => setFilter(event.target.value)

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      find countries <input value={filter} onChange={filterChanged}/>
      <CountryList filter={filter} setFilter={setFilter} countries={countries} />
    </div>
  )
}

const CountryList = ({filter, setFilter, countries}) => {
  const showCountryPressed = (event) => {
    console.log('pressed ', event.target.id)
    setFilter(event.target.id)
  }

  const filteredCountries = () => {
    const filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(filter.toLowerCase()))
    if (filteredCountries.length > 10) {
      return "Too many matches, specify another filter"
    } else if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} />
    } else {
      return filteredCountries.map((country) => { return (
        <div key={country.name}>
          {country.name} <button id={country.name} onClick={showCountryPressed}>view</button>
        </div> )
      })
    }
  }

  return (
    <div>
      {filteredCountries()}
    </div>
  )
}

const Country = ({country}) => {
  const languageList = () => {
    return (
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
    )
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2> languages</h2>
      {languageList()}
      <img src={country.flag} alt="flag" width="100"/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
