const express = require('express');
const exphbrs = require('express-handlebars')
const app = express();
const translation = require('./translations.json')
// console.log(translation)
const port = 3000;





app.set('view engine', 'handlebars');

app.engine('handlebars', exphbrs({
    defaultLayout: false,
    layoutsDir: __dirname + "views/"
}));


app.get('/:lang?', function (req, res) {
    res.render( 'home', {
        pageTitle: 'Welcome Languages',
        title: 'Lindouche'
});

});


app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());




app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});