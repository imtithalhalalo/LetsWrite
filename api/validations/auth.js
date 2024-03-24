const { body } = require('express-validator')

exports.registerValidation = [
    body('username', "Username is too short").isLength({ min: 3 }),
    body("email", "Not a valid email").isEmail(),
    body('password', 'Password is too short, at least 8 charachters').isLength({ min: 8 })
]

exports.loginValidation = [
    body("email", "Not a valid email").isEmail(),
    body('password', 'Password is too short, at least 8 charachters').isLength({ min: 8 })
]