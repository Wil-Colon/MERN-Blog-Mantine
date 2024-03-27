const router = require('express').Router();
const { test, test2 } = require('../controllers/user.controller');

router.get('/test', test2);

module.exports = router;
