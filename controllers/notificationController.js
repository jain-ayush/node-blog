import User from "../models/User.js"
import Notification from "../models/Notification.js"
// import { Op } from '@sequelize/core';
import Sequelize, { where } from 'sequelize'
const Op = Sequelize.Op;

class notificationController {
    static getUsers = async (req,res) => {
        try {
            const userList = await User.findAll({
                where:{
                    email:{ [Op.ne]:'admin@yopmail.com' }
                }
            })
            res.status(201).send({"status":"success","message":"All User list",data:userList});
        } catch (error) {
            res.status(400).send({"status":"failed","message":error.message});  
        }
    }

    static getNotifications = async (req,res) => {
        console.log('getNotifications function');
        try {
            const notificationList = await Notification.findAll({
                where: {
                    expiry_date: {[ Op.gte ] : new Date() }
                },
                include: [{
                    model: User,
                    as:'user_notifications',
                    attributes:['id','name']
                }],
                logging:console.log
            })
            res.status(201).send({"status":"success","message":"All User list",data:notificationList});
        } catch (error) {
            res.status(400).send({"status":"failed","message":error.message});  
        }
    }

    static addNotifications = async(req,res) => {
        try {
            const result = await Notification.create(req.body)
            res.status(201).send({"status":"success","message":"Notifications Created Successfully", data:result});
        } catch (error) {
            res.status(400).send({"status":"failed","message":error.message});    
        }
    }

    static getUserDetail = async(req,res) => {
        const {id} = req.params
        try {
            const user_details = await User.findByPk(id);
            const notifications = await Notification.findAll({
                where: {
                    user_id: id,
                    expiry_date: {[ Op.gte ] : new Date() }
                }
            })
            const unread_notifications = await Notification.findAll({
                where: {
                    user_id: id,
                    status: 0,
                    expiry_date: {[ Op.gte ] : new Date() }
                }
            })

           const combinedResult = {
            user_details: user_details,
            notifications: notifications,
            unread_notifications: unread_notifications
           }
           console.log('combinedResult',combinedResult);
            res.status(201).send({"status":"success","message":"User Details", data:combinedResult});
        } catch (error) {
            res.status(400).send({"status":"failed","message":error.message});
        }
    }

    static changeStatus = async(req,res) => {
        const {id} = req.params
        try {
            const result = Notification.update(
                { status: 1},
                {
                    where: {
                        id : id      
                    }
                }                
            )
            res.status(201).send({"status":"success","message":"Status Changed", data:result});
        } catch (error) {
            res.status(400).send({"status":"failed","message":error.message});
            
        }
        
    }

}

export default notificationController