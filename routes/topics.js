const express = require('express')
const router = express.Router()
const {ensureAuthenticated} = require('../config/auth')
const Topic = require('../models/Topic')

router.use(ensureAuthenticated)

// @desc    Show all of the topics
// @route   GET /newTopic
router.get('/newTopic', (req, res) => {
    res.render('newTopic.ejs', {})
})

// @desc    add a topic
// @route   POST /newTopic
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

// @desc    delete a topic by id
// @route   GET /delete/:id
router.get('/delete/:id', async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id)
        await Topic.deleteOne({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (error) {
       console.log(error) 
    }    
})

// @desc    edit a topic by id
// @route   GET /delete/:id
// router.get('/edit/:id', (req, res) => {
//     const id = req.params.id
//     Topic.find({}, (err, topics) => {
//         res.render('edit.ejs')
//     })
// })

module.exports = router