const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// middleware for parsing JSOn and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

app.use(express.static('public'));

// get route for landing page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/html/index.html')))

// get route for notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/html/notes.html')))

// wildcard route
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/html/404.html')))

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
