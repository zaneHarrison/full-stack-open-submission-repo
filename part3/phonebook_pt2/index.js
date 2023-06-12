const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const numEntries = persons.length
    const date = new Date()
    response.send(
        `<div>
            <p>Phonebook has info for ${numEntries} people</p>
            <p>${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</p>
        </div>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find((person) => person.id === id)
    if (!person) {
        response.status(404)
        response.send('Person with the specified ID not found')
    }
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter((person) => person.id != id)
    response.status(204).end()
})

const generateId = () => {
    const max = 999999
    const min = persons.length
    return Math.random() * (max - min) + min
}

app.post('/api/persons', (request, response) => {
    const person = {
        name: request.body.name,
        number: request.body.number
    }
    person.id = generateId()
    persons = persons.concat(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})