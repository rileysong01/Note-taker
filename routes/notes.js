
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

// get all existing tips
notes.get('/', (req, res) => readFromFile('db/notes.json').then((data) => res.json(JSON.parse(data))));

// post new tip
notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        }
        readAndAppend(newNote, 'db/notes.json')
    } else {
        res.status(500).json({ error: 'Error in adding tip' });
    }
});

// delte route for specific tip
notes.delete('/:id', (req, res) => {
    console.log(req)
    const noteId = req.params.id;
    readFromFile('db/notes.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const newArray = json.filter((note) => note.id !== noteId)
        writeToFile('db/notes.json', newArray)
        console.log(`item ${noteId} has been deleted`)
        res.json('item has been deleted')
    })
})

module.exports = notes;