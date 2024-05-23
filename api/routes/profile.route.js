const router = require('express').Router();
const auth = require('../middleware/auth');
const {
    getProfileById,
    getCurrentUserProfile,
    updateProfile,
} = require('../controllers/profile.controller');

//GET Currently Logged in users Profile
router.get('/me', auth, getCurrentUserProfile);

//GET Profile by ID
router.get('/:id', auth, getProfileById);

//PUT update profile for user by ID
router.put('/updateprofile', auth, updateProfile);

module.exports = router;
