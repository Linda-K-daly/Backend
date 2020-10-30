const express = require('express');
const port = 3000;

const app = express();

const numAuthors = [1,2,3,4]

const books1 = 







app.get('/', (req, res) => {
    res.send('Authors API');
  });

app.get(`/authors/${numAuthors[0]}`, (req, res) => {
    res.send('Lawrence Nowell, UK');
  });

app.get(`/authors/${numAuthors[1]}`, (req, res) => {
    res.send('William Shakespeare, UK');
  });

app.get(`/authors/${numAuthors[2]}`, (req, res) => {
    res.send('Charles Dickens, US');
  });

app.get(`/authors/${numAuthors[3]}`, (req, res) => {
    res.send('Oscar Wilde, UK');
  });



app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });