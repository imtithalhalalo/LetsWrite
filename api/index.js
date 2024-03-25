const express = require("express")
require("dotenv").config()
const port = process.env.PORT || 5000
const mongoose = require("mongoose");
const multer = require('multer')
const fs = require('fs')
const protectAuth = require('./middlewares/protectAuth')

const app = express();

app.use(express.json())

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads')
        }

        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})


const upload = multer({ storage })

app.post('/poster', protectAuth, upload.single('story-poster'), (req, res) => {
    return res.status(200).json({
        URL: `api/posters/${req.file.originalname}`
    })
})
app.get("/", (req, res) => {
    return res.send("Hello from node server!")
})

app.use('/api/posters', express.static('uploads'))
app.use("/api/user", require("./routes/user.routes"))
app.use('/api/stories', require('./routes/stories.routes'))

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port , () => {
            console.log(`Server is runnig on ${port}`);
        })
        console.log(`Database is connected on ${mongoose.connection.host}`);
    })
    .catch(e => console.log(e))
