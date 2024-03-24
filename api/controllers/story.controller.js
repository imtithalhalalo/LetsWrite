const createStory = async (req, res) => {
    return res.send('This is the create function')
}

const updateStory = async (req, res) => {
    return res.send('This is the updateStory function')
}


const getStories = async (req, res) => {
    return res.send('This is the getStories function')
}


const getStory = async (req, res) => {
    return res.send('This is the getStory function')
}

const deleteStory = async (req, res) => {
    return res.send('This is the delete function')
}

module.exports = { createStory, updateStory, getStories, getStory, deleteStory }
