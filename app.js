const express = require('express')
const router = require('./routes') // import router module
const app = express()
const port = 3000

app.use(router) // use router
app.use(express.static('public'))

app.set('views',__dirname + '/public/views') // The folder where the template engine is located
app.set('view engine', 'ejs') // Template properties

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})