const express = require('express');
const exphbrs = require ('express-handlebars')


const app = express();
const port = 3000;

const students = ['Jean', 'Binta', 'Agathe', 'Adil'];

app.set('view engine', 'handlebars');

app.engine('handlebars', exphbrs({
  defaultLayout: false,
  layoutsDir: __dirname + "views/"
}));



app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

// app.post('/form/signup', (req, res) => {
//   console.log('form parameter', req.body.username); 
// });

app.get('/students', function(req, res) {
  res.render('home', {
    students: ['Jean', 'Binta', 'Agathe', 'Adil']
  });
});

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });