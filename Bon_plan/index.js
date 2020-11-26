const express = require("express");
const exphbs = require("express-handlebars");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models").User; // same as: const User = require('./models/user');
const Product = require("./models").Product;
const { session } = require("passport")
const { static } = require("express")
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
// const expressValidator = require("express-validator");
// const validationResult = expressValidator.validationResult;
// const body = expressValidator.body;

var usersRoutes = require('./controllers/users');
var productsRoutes = require('./controllers/products');
// Handlebars.registerPartial('navLogin', '{{{navLogin}}}')


const port = process.env.PORT || 3000;

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/bon_plan",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
);

const app = express();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, Date.now() + ext);
  },
});
// let upload = multer({ storage: storage });

// Express configuration



app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// enable session management
app.use(
  expressSession({
    secret: "konexioasso07",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// // enable Passport
app.use(passport.initialize());
app.use(passport.session());

// enable routers
app.use('/users', usersRoutes);
app.use('/products', productsRoutes);

// // Passport configuration
passport.use(
  new LocalStrategy(
    User.authenticate()));

passport.serializeUser(User.serializeUser()); // Save the user.id to the session
passport.deserializeUser(User.deserializeUser()); // Receive the user.id from the session and fetch the User from the DB by its ID

app.get("/", (req, res) => {
  // console.log("GET /");
  res.render("home", {
    isUserLogged: req.isAuthenticated(),
    username: req.user ? req.user.username : null,
    profilePicture: req.user ? req.user.profilePicture : null,
  })
});



app.get("/profile", (req, res) => {
  console.log("GET /profile");
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.render("profile", {
      username: req.user.username,
      surname: req.user.surname,
      firstName: req.user.firstName,
      isUserLogged: req.isAuthenticated(),
      profilePicture: req.user.profilePicture
    });
    console.log("firstName dans profile", req.user.firstName)
  } else {
    res.redirect("/");
  }
})

app.get("/signup", (req, res) => {
  console.log(" je suis dans signup");
  if (req.isAuthenticated()) {
    res.redirect("/profile");
  } else {
    res.render("signup");
  }
});

app.post("/signup", upload.single('image'), async (req, res, next) => {
    const { username, password } = req.body;
    User.register(
      new User({
        username,
        password,
        profilePicture: req.file.filename,
      }),
      password, // password will be hashed
      (err, user) => {
        if (err) {
          console.log("/signup user register err", err);
          return res.render("signup");
        } else {
          passport.authenticate("local")(req, res, () => {
            res.redirect("/profile");
          });
        }
      }
    );
  });




app.post("/upload", upload.single("image"), function (req, res) {
  console.log("req.body", req.body);
  console.log(req.file);
})


app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/profile");
  } else {
    res.render("login");
  }
});

app.post("/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }), (req, res) => {
    console.log('authenticate login');
  }
);


app.get("/logout", (req, res) => {
  console.log("je me logout");
  req.logout();
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
