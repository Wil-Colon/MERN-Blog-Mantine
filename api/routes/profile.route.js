const router = require('express').Router();
const auth = require('../middleware/auth');
const {
    getProfileById,
    getCurrentUserProfile,
} = require('../controllers/profile.controller');

//Get Currently Logged in users Profile
router.get('/me', auth, getCurrentUserProfile);

//Get Profile by ID
router.get('/:id', auth, getProfileById);

module.exports = router;
