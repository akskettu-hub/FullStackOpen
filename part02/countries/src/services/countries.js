import axios from 'axios'
const allUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const nameUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAll = () => axios.get(allUrl)

const getCountry = (country) => axios.get(`${nameUrl}${country}`)

const API_key = import.meta.env.VITE_SOME_KEY

const getWeather = ([lat, lon]) => {
    
    console.log('Made api call with cords:', 'lat:', lat, 'lon', lon)
    return(
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`)
    )
} 

export default {
    getAll,
    getCountry,
    getWeather    
}