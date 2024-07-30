import express from 'express';
const router = express.Router();
import notificationController from '../controllers/notificationController.js';
import authMiddleware from '../middlewares/auth-middleware.js'

router.get('/getUsers',authMiddleware.checkUserAuth, notificationController.getUsers);
router.get('/getNotifications',authMiddleware.checkUserAuth, notificationController.getNotifications);
router.post('/addNotifications',authMiddleware.checkUserAuth, notificationController.addNotifications);
router.get('/getUserDetail/:id',authMiddleware.checkUserAuth, notificationController.getUserDetail);
router.get('/changeStatus/:id',authMiddleware.checkUserAuth, notificationController.changeStatus);





export default router
