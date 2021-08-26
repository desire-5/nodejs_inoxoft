const Router = require('express');
const registerController = require('../controllers/registerController');
const router = new Router();

router.get('/', (req, res) => {
    res.render('register');
})

router.post('/', registerController.register);

module.exports = router;