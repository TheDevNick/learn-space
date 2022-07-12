const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
    topicName: {
        type: String,
        required: true
    },
    topicDifficulty: {
        type: String,
        required: true
    },
    topicFeedback: {
        type: String,
        required: true
    }

    // add created by field here
})

const Topic = mongoose.model('Topic', TopicSchema, 'topics')

module.exports = Topic