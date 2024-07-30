// import mongoose from "mongoose";
// const userSchema = new mongoose.Schema({
//     // user_id: {type:String,required:true,allowNull:false,autoIncrement:true,primaryKey:true},
//     name: {type:String,required:true,trim:true},
//     email: {type:String,required:true,trim:true},
//     password: {type:String,required:true,trim:true},
//     tc: {type:Boolean,required:true}
// })
// // Model
// const userModel = mongoose.model("user",userSchema);
// export default userModel;

// Model using mysql
import { Sequelize, DataTypes } from "sequelize"
import connectDB from "../config/connectdb.js";
// import Notification from "./Notification.js";

    const User = connectDB.define("users", {
        id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        notification_switch: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        email_verified_at: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        remember_token: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
 // shruti se puchna pdega
    // User.associate = ({ Notification }) => {
    //     User.hasMany(Notification, {
    //         foreignKey: 'user_id',
    //         as: 'notifications'
    //     });
    // };

    //     User.hasMany(Notification, {
    //         foreignKey: 'user_id',
    //         as: 'notifications'
    //     });
    // User.hasMany(Notification)
    export default User;
