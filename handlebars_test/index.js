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

app.get('/', function(req, res) {
  res.render('home', {
    title: 'Ma homepage'
  });
});

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });