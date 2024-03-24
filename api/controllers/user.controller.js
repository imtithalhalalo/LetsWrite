const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const isExists = await User.findOne({ email: req.body.email })

        if (isExists) {
            return res.status(400).json({
                message: 'Already created an account'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)

        const doc = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })

        const user = await doc.save()

        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        const { password, ...userData } = user._doc;

        return res.status(200).json({ userData, token })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


module.exports = { register }
