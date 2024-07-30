import express from 'express';
const router = express.Router();
import blogController from '../controllers/blogController.js';
import authMiddleware from '../middlewares/auth-middleware.js'



// Protected Routes
router.post('/addBlog',authMiddleware.checkUserAuth, blogController.addBlog);
router.patch('/updateBlog/:id',authMiddleware.checkUserAuth, blogController.updateBlog);
router.delete('/deleteBlog/:id',authMiddleware.checkUserAuth, blogController.deleteBlog);
router.get('/getAllBlogs',authMiddleware.checkUserAuth, blogController.getAllBlogs);
router.get('/getPostById/:id',authMiddleware.checkUserAuth, blogController.getPostById);

export default router