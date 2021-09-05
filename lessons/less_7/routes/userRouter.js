const Router = require('express');

const { authMiddlewares } = require('../middlewares');
const userControllers = require('../controllers/userController');
const {
    getUserByDynamicParam, isValidUserData, isValidUserDataUpd, isUserByIdExist, isMailExist
} = require('../middlewares/user_middleware');

const router = new Router();

router.use('/:user_id', getUserByDynamicParam('user_id', 'params', '_id'), isUserByIdExist);

router.get('/:user_id', userControllers.getUserById);
router.get('/', userControllers.getAllUsers);
router.delete('/:user_id', authMiddlewares.checkAccessToken, userControllers.deleteUserById);
router.post('/', isValidUserData, getUserByDynamicParam('email'), isMailExist, userControllers.createUser);
router.put('/:user_id', authMiddlewares.checkAccessToken, isValidUserDataUpd, userControllers.updateUser);

module.exports = router;
