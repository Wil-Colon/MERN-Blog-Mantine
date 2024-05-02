const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const { register } = require('../controllers/auth.controller');

router.post(
    '/register',
    [
        check('username', 'Name is required')
            .not()
            .isEmpty()
            .isLength({ min: 3 })
            .withMessage('Username must be greater then 3 characters!'),
        check('email', 'please include a valid email address').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),
    ],
    register
);

module.exports = router;
