const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const PORT = process.env.PORT || 3001
const MongoClient = require('mongodb').MongoClient


// DB CONNECTION
let dbConnectionStr = process.env.DB_STRING,
    dbName = 'learnspace'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        const db = client.db(dbName)
        console.log(`Connected to ${dbName} Database`);
    })


// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(express.static('./public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('METHOD USED: :method | URL REQUESTED: :url |'))

// routes
app.get('/', (req, res) => {
    res.render('index.ejs', {})
})

// listen
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}... You better go catch it!`);
})