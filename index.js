const express = require("express")
const bodyParser = require("body-parser")

const port = process.env.PORT || 3001

// create our express app
const app = express()

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// routes
const routes = require('./routes/account')
app.use('/', routes)

//start server
app.listen(port, ()=>{
    console.log(`listeniing at port:${port}`)
}) 