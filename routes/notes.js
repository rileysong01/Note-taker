
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');

// get all existing tips
notes.get('/', (req, res) => readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data))));

notes.post('/', (req, res) => {
    console.log(req.body)
})