require('dotenv').config({ path: './config/env/local.env' });
const express = require('express');
const session = require('express-session');
const router = require('./routes'); // import router module


const app = express();
const port = 3000;

app.use(express.json());
app.use(session({
    secret: 'your-secret-key', // It is recommended to replace this with the actual security key
    resave: false, // Whether to resave the session every time, the default is true
    saveUninitialized: false, // Whether to regenerate the session every time, the default is true
    cookie: { secure: false } // It is recommended to set this to true in production environments to use HTTPS
  }));
app.use(router); // use router
app.use(express.static('public'));

app.set('views',__dirname + '/public/views'); // The folder where the template engine is located
app.set('view engine', 'ejs'); // Template properties

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});