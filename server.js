const express = require('express')
const app = express()
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const morgan = require('morgan')



const dbStr = require('./config/db').MongoURI
let dbName = 'learnspace'

mongoose.connect(dbStr, {useUnifiedTopology: true})
.then(client => {
    console.log(`Connected to ${dbName} Database`)
})


// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(express.static('./public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan(`METHOD: :method | URL: localhost: :url |`))

// routes
app.use('/', require('./routes/index'))
app.use('/', require('./routes/users'))
app.use('/', require('./routes/dashboard'))
app.use('/', require('./routes/newTopic'))

// listen
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}... You better go catch it!`);
})
