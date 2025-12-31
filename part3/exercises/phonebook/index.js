const express= require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

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

// json middleware
app.use(express.json());

// cors middleware to allow requests from origins // defaults to all origins if no specific one given
app.use(cors());

// custom logging using morgan
morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status - :response-time ms :body'));

app.get('/', (request, response) => {
    response.send("<h1>Hello World</h1>");
})

// GET all persons
app.get('/api/persons', (request, response) => {
    response.send(persons);
})

// Display count and time of request
app.get(`/info`, (request, response) => {
    const count = persons.length;
    // get current time at which request was recieved
    const date = new Date();
    const returnString = `<p>Phonebook has info of ${count} people</p><p>${date}</p>`;
    response.send(returnString);
})

// find a single entry in persons, matching input id
const findUnique = (id) => {
    return persons.find((person) => person.id === id);    
}

// returns person array, without the person object matching 'id'
const filterPerson = (id) => {
    return persons.filter((person) => person.id !== id)
}

// returns a random-generated id
const generateId = () => {
    const minCeiled = Math.ceil(0);
    const maxFloored = Math.floor(100000);

    return String(Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled));
}

app.get('/api/persons/:id', (request, response) => {
    const { id } = request.params;
    const person = findUnique(id);
    if (person) {
        response.send(person);
    } else {
        response.status(404).end();
    }
    
})

app.delete('/api/persons/:id', (request, response) => {
    const { id } = request.params;
    persons = filterPerson(id);
    response.status(204).send(persons);
})

// POST new person
app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: "name missing"
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: "number missing"
        })
    }
    // testing to see if new person with name already exists
    const personExists = Boolean(persons.find(person => person.name === body.name))
    if (personExists) {
        return response.status(400).json({
            error: "Name already exists, try again with unique name"
        })
    }

    // construct new person object
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    } 
    persons = persons.concat(person)

    response.status(200).send(person);
})


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on: https://localhost:${PORT}`)
})
