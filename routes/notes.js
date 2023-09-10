
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
            tip_id: uuidv4()
        }
        readAndAppend(newNote, 'db/notes.json')
    } else {
        res.status(500).json({ error: 'Error in adding tip' });
    }

});

module.exports = notes;