const Story = require('../models/story')

const createStory = async (req, res) => {
    try {
        const doc = new Story({
            title: req.body.title,
            text: req.body.text,
            poster: req.body.poster,
            author: req.userId
        })

        const story = await doc.save()
        return res.status(200).json(story)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateStory = async (req, res) => {
    return res.send('This is the updateStory function')
}


const getStories = async (req, res) => {
    try {
        const stories = await Story.find().sort({ createdAt: -1 }).populate('author').exec();

        return res.status(200).json(stories)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


const getStory = async (req, res) => {
    return res.send('This is the getStory function')
}

const deleteStory = async (req, res) => {
    return res.send('This is the delete function')
}

module.exports = { createStory, updateStory, getStories, getStory, deleteStory }
