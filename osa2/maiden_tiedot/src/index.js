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
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3> languages</h3>
      {languageList()}
      <img src={country.flag} alt="flag" width="100"/>
      <Weather country={country} />
    </div>
  )
}

const Weather = ({country}) => {
  const [weather, setWeather] = useState()

  useEffect (() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`)
      .then(response => {
        console.log("got weather: ", response.data)
        setWeather(response.data)
      })
  }, [country.name])

  return !weather ? "" : (
    <div>
      <h3>Weather in {weather.location.name} </h3>
      <div><b>temperature: </b>{weather.current.temperature} celsius</div>
      {weather.current.weather_icons.map(iconUrl => { return(
        <img key={iconUrl} src={iconUrl} alt="weather icon" width="50"/>
        )})}
      <div><b>wind: </b>{weather.current.wind_speed} kph direction {weather.current.wind_dir}</div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
