import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth-middleware.js'
// Public Routes

// Route level middleware
// router.use('/change_password',authMiddleware.checkUserAuth);

router.post('/register', userController.userRegistration);
router.post('/login', userController.userLogin);



// Protected Routes
router.post('/change_password',authMiddleware.checkUserAuth, userController.changePassword);
router.get('/user_data',authMiddleware.checkUserAuth, userController.UserData);


// Export Router
export default router;