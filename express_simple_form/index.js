const express = require('express');
const exphbrs = require ('express-handlebars')
const app = express();
const port = 3000;

const students = [];



app.set('view engine', 'handlebars');

app.engine('handlebars', exphbrs({
  defaultLayout: false,
  layoutsDir: __dirname + "views/"
}));




app.get('/', function(req, res) {
  res.render('home', {
    students: students
  });
  
});

app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

app.post('/students/add', (req, res) => {
    const username = req.body.username;
    students.push(username);
    res.render ('studentsadded', {
      username: username
    });  
  });


app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });