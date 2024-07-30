import Blog from "../models/Blog.js";
import helper from "../helpers/context.helper.js"
class BlogController {

    static addBlog = async (req,res) => {
        try {
            const result = await Blog.create(req.body);
            res.status(201).send({"status":"success","message":"Blogs Created Successfully", data:result});
        } catch (error) {
            res.status(400).send({"status":"failed","message":error.message});            
        }
       
    }

    static updateBlog = async ( req, res) => {
        const { id } = req.params;
        const updateData = {
            title : req.body.title ? req.body.title : "",
            description : req.body.description ? req.body.description : "",
            status : req.body.status ? req.body.status : "",
            image : req.body.image ? req.body.image : "",
        }
        try {
            const result = await Blog.update(updateData, {                
                where:{
                    id:id
                },                
            });
            res.status(201).send({"status":"success","message":"Blogs Updated Successfully"});
        } catch (error) {
            res.status(400).send({"status":"failed","message":error.message});            
        }
    }

    static deleteBlog = async(req, res) => {
        const { id } = req.params;
        try {
            await Blog.destroy({
                where:{
                    id:id
                }
            });
            res.status(201).send({"status":"success","message":"Blogs Deleted Successfully"});
        } catch (error) {
            res.status(400).send({"status":"failed","message":error.message});   
        }
        
    }

    static getAllBlogs = async(req, res) => {
        // const userId = helper.get('user_id', res)
        // console.log('user_id', userId);
        try {
            const allBlogs = await Blog.findAll();
            res.status(201).send({"status":"success","message":"All Blog list",data:allBlogs});
        } catch (error) {
            res.status(400).send({"status":"failed","message":error.message});               
        }

    }

    static getPostById = async(req, res) => {
        const {id} = req.params
        console.log('post id', id);
        try {
            const blog = await Blog.findByPk(id)
            res.status(201).send({"status":"success","message":"All Blog list",data: blog});
        } catch (error) {
            res.status(400).send({"status":"failed","message":error.message});      
        }
    }

}

export default BlogController