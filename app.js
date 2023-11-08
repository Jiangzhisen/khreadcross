require('dotenv').config({ path: './config/env/local.env' });
const express = require('express');
const session = require('express-session');
const router = require('./routes'); // import router module


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: '7AC158C3949A25ADED15B8C3E7D96', // It is recommended to replace this with the actual security key
    resave: false, // Whether to resave the session every time, the default is true
    saveUninitialized: false, // Whether to regenerate the session every time, the default is true
    cookie: { secure: false } // It is recommended to set this to true in production environments to use HTTPS
  }));
app.use(router); // use router
app.use(express.static('public'));
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message  || 'Internal Server Error'
        }
    });
});

app.set('views',__dirname + '/public/views'); // The folder where the template engine is located
app.set('view engine', 'ejs'); // Template properties

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});