const { User } = require('../models/user.model');
const { Profile } = require('../models/profile.model');
const { validationResult } = require('express-validator');

const dotenv = require('dotenv');
dotenv.config();

//Create Profile

//Get Currently logged in Users Profile
exports.getCurrentUserProfile = async (req, res) => {
    try {
        let id = req.user.id;

        let profile = await Profile.findOne({ user: id });

        if (!profile) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'No profile found.' }] });
        }

        res.json(profile);
    } catch (err) {
        return res.status(400).json({
            errors: [{ msg: 'error in auth controller' }],
        });
    }
};

//Get Profile by ID
//'api/profile/:id'
exports.getProfileById = async (req, res) => {
    try {
        let id = req.params.id;

        let profile = await Profile.findOne({ user: id });

        if (!profile) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'No profile found.' }] });
        }

        res.json(profile);
    } catch (err) {
        return res.status(400).json({
            errors: [{ msg: 'error in auth controller' }],
        });
    }
};
