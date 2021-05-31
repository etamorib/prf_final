const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookie_parser = require('cookie-parser');
const body_parser = require('body-parser');
const handleErrors = require('./middleware/handleErrors');
const { BadRequest } = require('./utils/errors');
const ProductRoute = require('./routes/product.routes')
const UserRoute = require('./routes/user.routes')
const AuthRoute = require('./authorization/authorization.routes');
const PassportConfig = require('./authorization/passport-config');

const expressSession = require('express-session');
const passport = require('passport');

//App and port
const app = express();
const port = process.env.PORT || 3000;

//Getting connection string
require('dotenv').config();
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_url = 'mongodb+srv://' + db_username + ':' + db_password + '@webshop-cluster.tlzq4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


//Cors and parsers
const whitelist = ['https://<project_id>.web.app', 
'https://<project_id>.firebaseapp.com', 
'http://localhost:4200'];

var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 
    'Origin', 'Accept']
  };

app.use(cors(corsOptions));
app.use(cookie_parser());
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

//Setting up mongoose connection
mongoose.connect(db_url);

mongoose.connection.on('connected', () => {
  console.log('Connected to db was successful!');
})

mongoose.connection.on('error', (err) =>{
  console.log('Failed to connect to db', err);
})

//Login - passport and express-session
PassportConfig(passport);
app.use(expressSession({ secret: process.env.SESSION_SECRET, resave: true }));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

//Configuring the routes
ProductRoute.productRoutesConfig(app);
UserRoute.userRoutesConfig(app);
AuthRoute.authRoutesConfig(app);
app.use(handleErrors);

//Server is running
app.listen(3000, () =>{
  console.log('Server running on port: ' + port);
})