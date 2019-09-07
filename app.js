require('dotenv').config();
let express = require('express'),
    app = express(),
    jwt = require('jsonwebtoken'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    User = require('./database/user'),
    path = require('path');

let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET;

let myStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
    let email = payload.email;
    let name = payload.name;

    User.findByEmail(email)
        .then(user => {
            if (user.name == name) {
                done(null, user);
            }
        })
        .catch(err => done(err, null));
});

/*
const cat = require('./database/cat');

let catObj = {
    id : 2,
    name : 'Computer',
    image : 'computer.png',
    since : Date.now()
}

cat.save(catObj)
.then(res => console.log(res))
.catch(err => console.log(err));

cat.all()
.then(res => console.log(res))
.catch(err => console.log(err));

let obj = {
    id : '5d68dc0c2622743d3ac5f470',
    name : 'Car'
}

const seeder = require('./database/seeder');
seeder.seedCat();

cat.all().then(res => console.log(res)).catch(err => console.log(err));
*/
//const Product = require('./database/product');
// Product.destroy(1)
// .then(res => console.log(res))
// .catch(err => console.log(err));

// const passgen = require('./helper/passgen');
// let pass = "123";
// let encoded = '$2a$10$loyrzm6l.KvE7xr2SEEj4.pF9DkwAFTsyn2tWg4PahvUQUUCuBcmG';

// passgen.compare(pass, encoded)
//     .then(res => console.log(res))
//     .catch(err => console.log(err));

let userRoute = require('./routes/user')(express, jwt);
let adminRoute = require('./routes/admin')(express, passport);
let guestRoute = require('./routes/guest')(express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
passport.use(myStrategy);

app.use(express.static(path.join(__dirname, './assets')));
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/', guestRoute);

app.listen(process.env.PORT, () => {
    console.log('Server is running at', process.env.PORT);
    //console.log('Server is running at', process.env.PORT);
})