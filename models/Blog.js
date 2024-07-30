import { Sequelize, DataTypes } from "sequelize"
import connectDB from "../config/connectdb.js";

const Blog = connectDB.define("blogs", {
    id: {
        type: DataTypes.BIGINT(36),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type:DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type:DataTypes.STRING(255),
        allowNull: true
    },
    image: {
        type:DataTypes.STRING(255),
        allowNull: true
    },
    status: {
        type:DataTypes.STRING(25),
        allowNull: true
    },
    created_by: {
        type:DataTypes.BIGINT(21),
        allowNull: false
    }
},
{
    timestamps: true,
    createdAt : "created_at",
    updatedAt : "updated_at"
});

export default Blog