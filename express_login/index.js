const express = require("express");
const exphbs = require("express-handlebars");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models").User;
const age = require("./age"); // same as: const User = require('./models/user');

const port = process.env.PORT || 3000;

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://localhost:27017/authentication_exercise",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
);

const app = express();

// Express configuration

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// enable session management
app.use(
  expressSession({
    secret: "konexioasso07",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// enable Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(
  new LocalStrategy(
  // User.authenticate()));
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
        console.log("email", email);
        console.log("password", password);
        console.log("done",done);
        try {
            const user = await User.findOne({email})
            if (!user) return done(null,false);
            if (user.password == password)
              return done(null, user)

        } catch (err){
          console.error(err);
          done(err)
        }
    }
  )
); 



passport.serializeUser(User.serializeUser()); // Save the user.id to the session
passport.deserializeUser(User.deserializeUser()); // Receive the user.id from the session and fetch the User from the DB by its ID

app.get("/", (req, res) => {
  console.log("GET /");
  res.render("home");
});

app.get("/admin", (req, res) => {
  console.log("GET /admin");
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.render("admin", {
        firstname: req.user.firstname,
        surname: req.user.surname,
        dateOfbirth:age(req.user.dateOfbirth),
    });
  } else {
    res.redirect("/");
  }
});



app.get("/signup", (req, res) => {
  console.log("GET /signup");
  if (req.isAuthenticated()) {
    res.redirect("/admin");
  } else {
    res.render("signup");
  }
});



app.post("/signup", (req, res, next) => {
    const {username, email, password, firstname,surname,dateOfbirth} = req.body;
  User.create({
      username,
      email,
      password,
      firstname,
      surname,
      dateOfbirth,
    }, (err, user) => {
      if (err) {
        return res.status(500).send(err)
      } 
      next()
    })
}, passport.authenticate("local"), (req,res) => res.redirect("/admin"))


app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/admin");
  } else {
    res.render("login");
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login",
  }), (req, res) => {
    console.log('HELLO LINDOUCHE');
  }
);


app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});



