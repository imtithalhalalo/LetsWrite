const express = require("express")
require("dotenv").config()
const port = process.env.PORT || 5000
const mongoose = require("mongoose");

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    return res.send("Hello from node server!")
})
app.use("/api/user", require("./routes/user.routes"))

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port , () => {
            console.log(`Server is runnig on ${port}`);
        })
        console.log(`Database is connected on ${mongoose.connection.host}`);
    })
    .catch(e => console.log(e))
