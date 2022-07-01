const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()
const PORT = process.env.PORT || 3001
const MongoClient = require('mongodb').MongoClient


// DB CONNECTION
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'learnspace'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(express.static('./public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan(`METHOD: :method | URL: localhost: :url |`))

// routes
app.get('/', (req, res) => {
    res.render('index.ejs', {})
})

app.get('/dashboard', (req, res) => {
    db.collection('topics').find().toArray()
        .then(results => {
            res.render('dashboard.ejs', {info: results})
        })
        .catch(err => console.error(err))
})

app.get('/newTopic', (req, res) => {
    res.render('newTopic.ejs', {})
})
app.post('/newTopic', (req, res) => {
    db.collection('topics').insertOne(
        {topicName: req.body.topicName,
        topicDifficulty: req.body.topicDifficulty, 
        topicFeedback: req.body.topicFeedback}
        )
        .then(result => {
            console.log('topic Added')
            res.redirect('/dashboard')
        })
        .catch(err => console.error(err))
})
// listen
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}... You better go catch it!`);
})
