const { User } = require('../models/user.model');
const { Profile } = require('../models/profile.model');
const { validationResult } = require('express-validator');

const dotenv = require('dotenv');
dotenv.config();

//Update Profile
//AUTH Route
//api/profile/updateProfile
exports.updateProfile = async (req, res) => {
    let id = req.user.id;
    let profileFields = req.body;

    try {
        let updatedProfile = await Profile.findOneAndUpdate(
            { user: id },
            { $set: profileFields },
            { new: true }
        );

        return res.status(200).json(updatedProfile);
    } catch (err) {
        res.status(500).json(err);
    }
};

//Get Currently logged in Users Profile
//AUTH Route
//api/profile/me
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
//AUTH Route
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
