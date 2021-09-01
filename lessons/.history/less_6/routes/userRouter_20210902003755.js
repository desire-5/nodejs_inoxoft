const Router = require('express');

const userControllers = require('../controllers/userController');
const {
    getUserByDynamicParam, isValidUserData, isValidUserDataUpd, isUserByIdExist, isMailExist
} = require('../middlewares/user_middleware');

const router = new Router();

router.use('/:user_id', getUserByDynamicParam('user_id', 'params', '_id'), isUserByIdExist);

router.get('/:user_id', userControllers.getUserById);
router.get('/', userControllers.getAllUsers);
router.delete('/:user_id', userControllers.deleteUserById);
router.post('/', isValidUserData, isMailExist, userControllers.createUser);
router.put('/', isValidUserDataUpd, userControllers.updateUser);

module.exports = router;
