import { Sequelize, DataTypes } from "sequelize";
import connectDB from "../config/connectdb.js";
import User from "./User.js";

const Notification = connectDB.define("notifications", {
    id: {
        type: DataTypes.BIGINT(36),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type:DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type:DataTypes.STRING(255),
        allowNull: false
    },
    expiry_date: {
        type:DataTypes.DATE(),
        allowNull: false
    },
    user_id: {
        type:DataTypes.BIGINT(25),
        allowNull: false,
        // references: {
        //     model: 'User',
        //     key: 'id'
        // },
    },
    status: {
        type:DataTypes.STRING(25),
        allowNull: true
    },

},
{
    timestamps: true,
    createdAt : "created_at",
    updatedAt : "updated_at"
});

// Notification.associate = ({User}) => {
    Notification.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user_notifications'
    })
// }


export default Notification