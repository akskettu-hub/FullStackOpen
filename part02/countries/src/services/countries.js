import axios from 'axios'
const allUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const nameUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAll = () => axios.get(allUrl)

const getCountry = (country) => axios.get(`${nameUrl}${country}`)

// const create = newObject => axios.post(baseUrl, newObject)

//const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject)

//const deleteEntry = (id) => axios.delete(`${baseUrl}/${id}`)


export default {
    getAll,
    getCountry
    
}