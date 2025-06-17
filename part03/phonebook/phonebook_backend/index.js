require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
//const cors = require('cors')
const app = express()

//app.use(cors())

app.use(express.static('dist'))

app.use(express.json())

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: req => req.method !== 'POST'
}))

app.use(morgan('tiny', {
    skip: req => req.method === 'POST'
}))


const Person = require('./models/person')

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello Squirrel!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  response.send(
    `<div>
        Phonebook has info for ${persons.length} people
    </div>
    <div>
        ${new Date()}
    </div>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(note => note.id === id)
  if (person) {
    response.json(person)
  } else {    
    response.status(404).end()  
  }
})

const generateId = () => {
    const maxId = persons.length * 100
    const newId = Math.floor(Math.random() * maxId) + 1

  return String(newId)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (persons.some(person => person.name === body.name)) {
    return response.status(400).json({
        error: 'name already in phonebook'
    })
  }

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name and/or number missing' 
    })
  }

  const person = new Person({
        name: body.name,
        number: body.number,
  })
  
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})