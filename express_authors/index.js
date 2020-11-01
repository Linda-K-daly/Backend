
const express = require('express');
const port = 3000;

const app = express();

// étape 1
const authors = [
    'Lawrence Nowell, UK',
    'William Shakespeare, UK',
    'Charles Dickens, US',
    'Oscar Wilde, UK'
]

const books = [
  'Beowulf',
  'Hamlet, Othello, Romeo and Juliet, MacBeth',
  'Oliver Twist, A Christmas Carol',
  'The Picture of Dorian Gray, The Importance of Being Earnest'
]

// étape 4

const authorsBooks = [
  {
      name: 'Lawrence Nowell',
      nationality: 'UK',
      books: ['Beowulf']
  }, {
      name: 'William Shakespeare',
      nationality: 'UK',
      books: ['Hamlet', 'Othello', 'Romeo and Juliet', 'MacBeth']
  }, {
      name: 'Charles Dickens',
      nationality: 'US',
      books: ['Oliver Twist', 'A Christmas Carol']
  }, {
      name: 'Oscar Wilde',
      nationality: 'UK',
      books: ['The Picture of Dorian Gray', 'The Importance of Being Earnest']
  }
]


// étape 1
app.get('/', (req, res) => {
    res.send('Authors API');
  });

app.get('/authors/:id/', (req, res) => {
    const id = req.params.id;

    if (id > authors.length) {
        res.send(`the author with the ID ${id} does not exist`);
    } else {
      res.send(authors[id-1])
    }
})


// étape 2
app.get ('/authors/:id/books', (req, res) => {
      const id = req.params.id;

      if (id > authors.length) {
          res.send (`The author with the ID ${id} does not exist`);
      } else {
          const {name, nationality } = authorsBooks[id-1]

          res.json({
            name,
            nationality,
          });
      }
});


app.get('/json/authors/:id/books', (req, res) => {
  const id = req.params.id;

  if (id > authors.length) {
      res.send(`The author with the ID ${id} does not exist`);
  } else {
      const { books } = authorsBooks[id - 1]

      res.json({ books });
  }
});

// étape 3
app.get ('*', function (res, res) {
    res.send ('Error');
});



app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });