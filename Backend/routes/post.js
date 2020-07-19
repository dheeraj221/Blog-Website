import express from "express";
import authenticate from "../middlewares/authenticate";
import postController from '../controller/post';

const router = express.Router({ mergeParams: true });
    
router.get('/', authenticate, postController.getAllPosts);
router.get('/:post_id', authenticate, postController.getPost);

router.post('/', authenticate, postController.addPost);

router.put('/:post_id', authenticate, postController.updatePost);

router.delete('/:post_id', authenticate, postController.removePost);

export default router;
