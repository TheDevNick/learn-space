const express = require('express')
const router = express.Router()
const Topic = require('../models/Topic')

router.get('/edit/:id', (req, res) => {
    const id = req.params.id
    Topic.find({}, (err, topics) => {
        res.render('edit.ejs')
    })
})

module.exports = router