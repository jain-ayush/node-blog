import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {

    static userRegistration = async (req,res) => {
        console.log("New User Registration");
        const {name,email,password,password_confirmation,tc} = req.body;
        const user = await User.findAll({
            where:{email:email}
        });

        if(user.length > 0){
            console.log("user exists");
            res.send({"status":"failed","message":"Email already Exist"});
        }
        else{
            if(name && email && password && password_confirmation && tc){
                if(password === password_confirmation)
                {
                    try {
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(password,salt);
                        
                        const newUser = await User.create({
                            name:name,
                            email:email,
                            password:hashPassword,
                            tc:tc
                        });
                                              
                        const saved_user = await User.findAll( 
                            {
                            where:{email:email}
                            });
                        
                        // Generate JWT Token while registering
                        const token = jwt.sign({userId : saved_user.id}, process.env.JWT_SECRET_KEY, {expiresIn: '5d'});
                        res.send({"status":"success","message":"User Registration Successfull","token":token})
                    } catch (error) {
                        
                    }
                }
                else{
                    res.send({"status":"failed","message":"Password and conform password does not match"});
                }
            } else {
            res.send({"status":"failed","message":"all Fields are required"});
            }
        }
    }

    static userLogin = async (req,res) => {
        try {
            const {email,password} = req.body;
            if(email && password)
            {
                const user = await User.findOne({
                    where:{email:email}
                }); 
                console.log('user details', user.id);         
                if(user != null)
                {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if((email === user.email) && isMatch){
                        // Generate JWT Token while login in
                        const token = jwt.sign({userId : user.id}, process.env.JWT_SECRET_KEY, {expiresIn: '5d'});
                        res.send({"status":200,"message":"Login Success","token":token,userData:user});
                        
                    } else{
                        res.send({"status":201,"message":"Email or password does not match"});

                    }
                }
                else{
                res.send({"status":201,"message":"Email does not exist"});
                    
                }
            } 
            else
            {
                res.send({"status":201,"message":"Email and Password is required"});
            }
        } catch (error) {
            console.log('login error',error);
            res.send({"status":201,"message":"Unable to login"});
            
        }
    }

    static changePassword = async (req,res) => {
        const {password,password_confirmation} = req.body;
        if(password !== password_confirmation)
        {
            res.send({"status":"failed","message":"Password and conform password does not match"});
        }
        else{
            const salt = await bcrypt.genSalt(10);
            const newHashPassword = await bcrypt.hash(password,salt);
            // console.log('user data',req.user);
            await User.findByIdAndUpdate(req.user._id,{$set:{password:newHashPassword}});
            res.send({"status":"succcess","message":"Password changed"});

        }
    }

    static UserData = (req,res) => {
        console.log('get user data');
        res.send({"status":200, "user_data":req.user});
    }

}

export default UserController;