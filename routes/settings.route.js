var express = require('express');
var router = express.Router();
var settingsController = require('../controllers/user/settings.controller');



router.get('/register', settingsController.register);
router.post('/register', settingsController.register);

router.get('/login', settingsController.login);
router.post('/login', settingsController.login);

router.get('/login1', settingsController.login1)
router.post('/login1', settingsController.login1)

module.exports = router;