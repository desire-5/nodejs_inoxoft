const Router = require('express');

const postControllers = require('../controllers/postControllers');
const { isUserByIdExist } = require('../middlewares/user_middleware');

const router = new Router();

router.get('/:user_id', isUserByIdExist, postControllers.getPostById);
router.get('/', postControllers.getAllPosts);
router.delete('/:user_id', postControllers.deletePostById);
router.post('/', postControllers.createPost);
router.put('/', postControllers.updatePost);

module.exports = router;
