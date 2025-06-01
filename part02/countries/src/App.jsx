import { useEffect, useState } from 'react'
import countriesService from './services/countries'

const SearchField = ({ value, onChange }) => <div>Find countries: <input value={value} onChange={onChange}/></div>

const Country = ({ country }) => <div> {country} </div>

const Countries = ({ filteredCountries }) => {
  if (!filteredCountries) {
    return null
  }

  return (
      filteredCountries.map(country => (
        <Country key={country} country={country} />
      ))
    )
}

  

const CountryCard = ({ country }) => {
  if (country === null) {
    return null
  }

  return (
    <div>
      <h1>{country}</h1>
    </div>
  )

}

const App = () => {
  const [newQuery, setNewQuery] = useState('')
  const [countries, setCountries]= useState([])
  const [filteredCountries, setFilteredCountries]= useState([])
  const [matchingcountry, setMatchingCountry]= useState(null)

  useEffect(() => {
    console.log("effect")
    countriesService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data.map(country => country.name.common))
        console.log("Found", countries.length, "countries")
      })
  }, [])
  
  //console.log(countries);

  const handleQueryChange = (event) => {
    setQueryChange(event)
    filterResults()
    
  }

  const setQueryChange = (event) => {
    console.log(event.target.value)
    setNewQuery(event.target.value)
    
  }

  const filterResults = () => {
    const matching = countries.filter(country => !newQuery || country.toLowerCase().includes(newQuery.toLowerCase()))
    console.log('state:', newQuery)
    console.log('matching:', matching)

  }

  const handleMatchingCountry = (country) => {
    countriesService
      .getCountry(country)
      .then(response => {
        console.log('found', country);
        console.log(response.data);
        setMatchingCountry(response.data)
      })
    setMatchingCountry()
  }

  return (
    <div>
      <SearchField value={newQuery} onChange={handleQueryChange}/>
      <Countries countries={filteredCountries}/>
    </div>
  )
}

export default App
