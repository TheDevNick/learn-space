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

// LOGGING
app.use(morgan(`METHOD: :method | URL: localhost: :url |`))

// Express Session 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))
  
// CONNECT FLASH
app.use(flash())

// GLOBAL VARS
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

// ROUTES
app.use('/', require('./routes/index'))
app.use('/', require('./routes/users'))
app.use('/', require('./routes/dashboard'))
app.use('/', require('./routes/newTopic'))

// LISTEN
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}... You better go catch it!`);
})
