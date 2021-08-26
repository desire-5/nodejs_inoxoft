const Router = require('express');

const authController = require('../controllers/authController')

const router = new Router();

router.post('/', authController.auth);


module.exports = router