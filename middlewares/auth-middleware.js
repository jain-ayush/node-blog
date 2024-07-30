import jwt from 'jsonwebtoken';
import userModel from '../models/User.js';
import helper from '../helpers/context.helper.js'

class auth {
    static checkUserAuth = async (req, res, next) => {
        const token = helper.getTokenFromHeader(req);
        if (!token) {
            res.send({ "status": 201, "message": "No Token available" });
        }
        else {
            try {
                // Verify token
                // Get user from token              
                const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
                // req.user = await userModel.findById(userId).select('-password');
                req.user = await userModel.findOne({
                    where:{id:userId},
                    attributes: { exclude: ['password'] }
                });
                helper.set('user_id', userId, res)
                next();

            } catch (error) {
                console.log('error',error);
                res.send({ "status": 201, "message": "Unauthorized user" });
            }
        }
    }
}
export default auth;
