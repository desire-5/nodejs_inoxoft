const Router = require('express');

const userControllers = require('../controllers/userControllers');

const router = new Router();

router.get('/', userControllers.getAllUsers);
router.get('/:user_id', userControllers.getUserById);

module.exports = router