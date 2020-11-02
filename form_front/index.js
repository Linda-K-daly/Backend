const express = require('express');
const exphbrs = require ('express-handlebars')


const app = express();
const port = 3000;

app.set('view engine', 'handlebars');

app.engine('handlebars', exphbrs({
  defaultLayout: false,
  layoutsDir: __dirname + "views/"
}));

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

app.post('/form/signup', (req, res) => {
  console.log('form parameter', req.body.username); 
});

app.get('/', function(req, res) {
  res.render('home', {
    title: 'My front form'
  });
});

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });