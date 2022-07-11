const express = require('express')
const router = express.Router()
const Topic = require('../models/Topic')

router.get('/newTopic', (req, res) => {
    res.render('newTopic.ejs', {})
})

router.post('/newTopic', async (req, res) => {
    try {
        const {topicName, topicDifficulty, topicFeedback} = req.body
        const newTopic = new Topic({
            topicName,
            topicDifficulty,
            topicFeedback
        })
        console.log('========= NEW TOPIC CREATED ===========')
        console.log(newTopic)
        console.log('========= NEW TOPIC CREATED ===========')
        await newTopic.save()
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
    }
})



module.exports = router