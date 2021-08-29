const Router = require('express');

const userControllers = require('../controllers/userController');
const { isUserByIdExist, isMailExist } = require('../middlewares/user_middleware');

const router = new Router();

router.get('/:user_id', isUserByIdExist, userControllers.getUserById);
router.get('/', userControllers.getAllUsers);
router.delete('/:user_id', isUserByIdExist, userControllers.deleteUserById);
router.post('/', isMailExist, userControllers.createUser);
router.put('/', userControllers.updateUser);

module.exports = router;
