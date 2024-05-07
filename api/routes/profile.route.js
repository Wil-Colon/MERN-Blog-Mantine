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

//POST Create profile for user by ID
router.post('/updateProfile', auth, updateProfile);

module.exports = router;
