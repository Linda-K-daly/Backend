const express = require("express");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
// models 
const user = require('./models/User');
const hotel = require('./models/Hotel');
const favorite = require('./models/Favorite');
const restaurant = require('./models/Restaurant');
const review = require('./models/review');

// Declare routes
const authRoute = require('./controller/auth')
const favoriteRoute = require('./controller/favorite')
const hotelRoute = require('./controller/hotel');
const restaurantRoute = require('./controller/restaurant');
const reviewRoute = require('./controller/review');

const port = process.env.PORT || 3000;
mongoose.connect("mongodb://localhost:27017/trippy_basics_api",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }
);


const app = express();
// Express configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Configuration de la session (cookie) pour l'auth
app.use(
    expressSession({
        secret: "konexioasso07",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

app.get ('/', function (req,res) {
    res.send('je suis dans le home')
})

app.use('/auth', authRoute(passport, user));

app.use('/favorite', favoriteRoute(passport, favorite));

app.use('/hotel', hotelRoute(passport, hotel));

app.use('/restaurant', restaurantRoute(passport, restaurant));

app.use('/review', reviewRoute(passport, review));







app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});