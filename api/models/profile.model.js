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
        type: String,
    },
    contact: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Profile = mongoose.model('Profile', ProfileSchema);

exports.Profile = Profile;
