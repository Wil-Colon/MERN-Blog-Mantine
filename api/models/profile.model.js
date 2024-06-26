const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    name: {
        type: String,
    },
    location: {
        type: String,
    },
    experience: {
        type: Number,
    },
    contact: {
        type: String,
    },
    social: {
        x: {
            type: String,
        },
        facebook: {
            type: String,
        },
        instagram: {
            type: String,
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Profile = mongoose.model('Profile', ProfileSchema);

exports.Profile = Profile;
