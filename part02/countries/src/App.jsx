import { useEffect, useState } from 'react'
import countriesService from './services/countries'

const SearchField = ({ value, onChange }) => <div>Find countries: <input value={value} onChange={onChange}/></div>

const Country = ({ country , handleClick}) => {
  return (
    <div> 
      {country} 
      <button type='button' onClick={() => handleClick(country)}>Show</button>
    </div>
  )
}

const Countries = ({ countries , handleClick}) => {
  console.log(countries)
  if (countries.length > 1 && countries.length < 11) {
    console.log('matching 2-10');
    
    return (
      <div>
        {
          countries.map(country => (
          <Country key={country} country={country} handleClick={handleClick} />
          ))
        }
      </div>
    )
  } 
  return null
}

const CountryCardFlag = ({ flagUrl }) => {
  console.log(flagUrl)
  //fetch picture
  //return renderable image
  return <img src={flagUrl} alt="Country flag not found" />
}

const CountryCardLanguages = ({ languages }) => {
  console.log(Object.values(languages));
  
  return (
    <div>
      <h2>Languages</h2>
      <ul>
        {
          Object.values(languages)
            .map((lang, index) => (
              <li key={index}>{lang}</li>
            ))
        }
      </ul>
    </div>
  )
}

const CountryCard = ({ countryData }) => {
  if (!countryData) {
    return null
  }

  console.log(countryData);
  console.log(countryData.capital); 

  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <div>Capital {countryData.capital.join(', ')}</div>
      <div>Area {countryData.area}</div>
      
      <CountryCardLanguages languages={countryData.languages}/>
      <CountryCardFlag flagUrl={countryData.flags.png}/>  
    </div>
  )
}

const App = () => {
  const [newQuery, setNewQuery] = useState('')
  const [countries, setCountries]= useState([])
  const [filteredCountries, setFilteredCountries]= useState([])
  const [matchingCountry, setMatchingCountry]= useState(null)
  const [matchingCountryData, setMatchingCountryData]= useState(null)

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

  useEffect(() => {
    // Filters countries by query in lower case. If query is empty, all pass filter.
    const matching = countries.filter(country => !newQuery || country.toLowerCase().includes(newQuery.toLowerCase()))

    setFilteredCountries(matching)

    if (matching.length === 1) {
      countriesService
        .getCountry(matching[0])
        .then(response => {
          console.log('promise fulfilled');
          setMatchingCountry(matching[0])
        })
    } else setMatchingCountry(null)
  }, [newQuery])

  useEffect(() =>{
    if (matchingCountry) {
      // fetch country data
      // set country data
      console.log('matching country found')
      countriesService
        .getCountry(matchingCountry)
        .then(response => {
          console.log('promise fulfilled: matching coutry');
          setMatchingCountryData(response.data)
        })
    } else {
      // set country data to null
      console.log('matching country set to empty array')
      setMatchingCountryData(null)
    }
  }, [matchingCountry])

  const handleQueryChange = (event) => {
    console.log(event.target.value)
    setNewQuery(event.target.value)
  }

  const handleClick = (country) => {
    console.log('clicked', country)    
    setMatchingCountry(country)
  }

  return (
    <div>
      <SearchField value={newQuery} onChange={handleQueryChange}/>
      <Countries countries={filteredCountries} handleClick={handleClick}/>
      <CountryCard countryData={matchingCountryData}/>
    </div>
  )
}

export default App