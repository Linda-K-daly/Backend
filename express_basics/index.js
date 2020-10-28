// Import et instantiation
const express = require('express');
const port = 3000;

const app = express();


// Routes
app.get('/', (req, res) => {
  res.send('salut Lindouche');
});
app.get('/hello', (req, res) => {
    res.send('Hello world!');
});
app.get('/hola', (req, res) => {
    res.send('Hola todos !');
});
app.get('/bonjour/:name', (req, res) => {
    res.send(`Bonjour ${req.params.name} !`);
});
app.get('/bonjour/:name/age/:age', function(req, res) {
    res.send(`Bonjour ${req.params.name} ! Tu as ${req.params.age} ans.`);
});
app.get('*', (req, res) => {
    res.send('All routes');
});

// Run server
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});