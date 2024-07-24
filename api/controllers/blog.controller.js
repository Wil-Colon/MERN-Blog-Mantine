const { Blog } = require('../models/blog.model');
const dotenv = require('dotenv');
dotenv.config();

//Get all Blogs
//api/blog/
exports.getAllBlogs = async (req, res) => {
    try {
        let blogs = await Blog.find();

        return res.status(200).json(blogs);
    } catch (err) {
        return res.status(400).json({
            errors: [{ msg: 'Blog server error' }],
        });
    }
};

//Get single Blog by ID
//api/blog/:id
exports.getSingleBlog = async (req, res) => {
    let blogId = req.params.id;

    try {
        let blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(400).json({
                errors: [{ msg: 'no blog found' }],
            });
        }

        res.status(200).json(blog);
    } catch (err) {
        return res.status(400).json({
            errors: [{ msg: 'Blog server error' }],
        });
    }
};

//PRIVATE AUTH
//Create Blog
//POST /api/blog/createblog
exports.createBlog = async (req, res) => {
    let id = req.user.id;
    let blogFields = {
        author: id,
        ...req.body,
    };

    try {
        const blog = new Blog({
            ...blogFields,
        });

        await blog.save();

        res.status(200).json(blog);
    } catch (err) {
        return res.status(400).json({
            errors: [{ msg: 'Blog server error' }],
        });
    }
};

//PRIVATE AUTH
//Update Blog
//Put /api/blog/updateblog/:blogid
exports.updateBlog = async (req, res) => {
    let userId = req.user.id;
    let blogId = req.params.blogid;
    let blogFields = req.body;

    try {
        // Check of blog exists
        let blog = await Blog.findById(blogId);

        if (!blog) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'No blog found to update.' }] });
        }

        //check if blog belongs to currently logged in user
        if (userId === blog.author.toString()) {
            // let blog = await Blog.findById(blogId);

            let updatedBlog = await Blog.findByIdAndUpdate(
                blogId,
                { $set: blogFields },
                { new: true }
            );

            return res.status(200).json(updatedBlog);
        }
    } catch (err) {
        return res.status(400).json({
            errors: [{ msg: 'Blog server error.' }],
        });
    }
};

//DELETE BLOG BY ID
