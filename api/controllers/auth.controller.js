const { User } = require('../models/user.model');
const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        //Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'User already exists' }] });
        }

        //Encrypy password
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.json({ newUser });
    } catch (err) {
        return res.status(400).json({
            errors: [{ msg: 'error in auth controller' }],
        });
    }
};
