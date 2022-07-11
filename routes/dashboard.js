const express = require('express')
const router = express.Router()
const Topic = require('../models/Topic')

router.get('/dashboard', (req, res) => {
    Topic.find()
    .then(results => {
        res.render('dashboard.ejs', {info: results})
    })
        .catch(err => console.error(err))
})

module.exports = router