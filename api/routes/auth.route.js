const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const { signup } = require('../controllers/auth.controller');

router.post(
    '/register',
    [
        check('username', 'Name is required').not().isEmpty(),
        check('email', 'please include a valid email address').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),
    ],
    signup
);

module.exports = router;
