const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')
const Topic = require('../models/Topic')

router.use(ensureAuthenticated)
router.get('/dashboard',(req, res) => {
    Topic.find()
    .then(results => {
        res.render('dashboard', {
            info: results,
            username: req.user.username
        })
    })
        .catch(err => console.error(err))
})

module.exports = router