const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const exphbrs = require('express-handlebars')

// étape 2: je crée et me connecte à ma base de données
mongoose.connect('mongodb://localhost:27017/upload',
    { useNewUrlParser: true, useUnifiedTopology: true },
    err => console.error(err))

const UserSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    surname: String,
    profilPicture: String
});
const User = mongoose.model("User", UserSchema);

// je teste la création de ma db en envoyant un user
// const linda = new User ({
//     username: "Linda",
//     firstName:"lindouche",
//     surname: "daly",
// })
// linda.save().then(res => console.log(res))


app.set('view engine', 'handlebars');
app.engine('handlebars', exphbrs(
  ));


app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());



app.use(express.static('public'));

// étape 1 :afficher le texte et l'image (pour voir l'image: /img)
app.get('/', function (req, res) {
    res.render('home', {
        title: 'Welcome to express upload'
    });
});


//   étape 3
app.post('/upload', upload.single('image'), (req, res) => {
    const userNew = req.body.username;
    username.push(userNew);
    const imageFile = req.file
    res.render('uploadadded', {
        username: userNew,
    });

    User.create({
        username: userNew,
        profilePicture: imageFile.path, 
    })
    .then((data) => console.log (data))
    .catch((err) => console.log(err));
});


app.get('/users/:id', async (req,res,next) => {
    const user = await UserSchema.findById(idUser)
    res.render('uploadadded', {
        user: user.username,
        image: user.profilePicture
    })
})

//  je crée un user pour l'envoyer dans la BDD
// const garali = new UserSchema ({
//         username:userNew,
//         profilPicture: imageFile.path
// })

// garali.save().then(res => console.log(res))


app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});



