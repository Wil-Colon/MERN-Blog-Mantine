const router = require('express').Router();
const { login, getUser } = require('../controllers/user.controller');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post(
    '/login',
    [
        check('email', 'Please include a valid email address').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    login
);

router.get('/', auth, getUser);

module.exports = router;
