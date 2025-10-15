// this file contains basic http server created using Express
const express = require('express');
const app = express();

let notes = [
    {
        id: '1',
        content: 'HTML is easy',
        important: true
    },
    {
        id: '2',
        content: 'Browser can execute only Javascript',
        important: false
    },
    {
        id: '3',
        content: 'GET and POST are the most important methods of HTTP protocol',
        important: true
    }
];
// middleware to parse and process JSON request body
app.use(express.json());

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
})

// GET all notes
app.get('/api/notes', (request, response) => {
    response.json(notes);
})

// GET a specific notes
app.get('/api/notes/:id', (request, response) => {
    // accessing id via object destructuring
    // const { id } = request.params;

    // accessing id via object dot notation
    const id = request.params.id;
    // find the note with provided id
    const note = notes.find(note => note.id === id);
    // response.send(`id of request: ${id}`)
    // response.json(note);
    if (note) {
        // response if note with id is found
        response.json(note);
    } else {
        // response if note with id is not found
        response.status(404).end();
    }
})

// DELETE a specific notes
app.delete('/api/notes/:id', (request, response) => {
    // id to be deleted, provided in URL by user request
    const { id } = request.params;
    // this is why we declared notes using let, so it can remain mutable
    // filter returns a new array, that satisfy the provided callback
    // callback in this case is to check each note's id, and see if it does not match id to be deleted
    notes = notes.filter(note => note.id !== id);
    response.status(204).end();
})

// function to create an Id
const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(note => Number(note.id)))
        : 0
    // id of new object would be current max id + 1
    return String(maxId + 1);
}

// PUT a new notes resource
app.post('/api/notes', (request, response) => {
    const body = request.body;
    // calculate current max Id of notes
    const maxId = notes.length > 0
        ? Math.max(...notes.map(note => Number(note.id)))
        : 0;
        
    if(!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId()
    }

    notes = notes.concat(note);

    response.json(note);
})

// app.use((request, response) => {
//     console.log("Request headers: ", request.headers);
//     console.log("Request content-type: ", request.get('content-type'));
// })
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})