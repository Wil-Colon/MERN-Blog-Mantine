const { User } = require('../models/user.model');
const { Profile } = require('../models/profile.model');
const { validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//REGISTER
//'api/auth/register'
exports.register = async (req, res) => {
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
                .json({ errors: [{ msg: 'Account already exists!' }] });
        }

        //Encrypy password
        const hashedPassword = bcrypt.hashSync(password, 10);
        // Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm',
        });

        const newUser = new User({
            username,
            email,
            avatar: avatar.slice(2),
            password: hashedPassword,
        });

        await newUser.save();

        //Create empty Profile
        const profile = new Profile({
            user: newUser.id,
            name: '',
            location: '',
            experience: '',
            contact: '',
            social: {
                youtube: '',
                twitter: '',
                facebook: '',
                linkedin: '',
                instagram: '',
            },
        });

        await profile.save();

        // return jsonwebtoken
        const payload = {
            user: {
                id: newUser.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWTSECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        return res.status(400).json({
            errors: [{ msg: 'error in auth controller' }],
        });
    }
};
