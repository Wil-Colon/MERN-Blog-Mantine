const { Blog } = require('../models/blog.model');
const { User } = require('../models/user.model');

const dotenv = require('dotenv');
dotenv.config();

//Get all Blogs
//GET api/blog/
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

//Get the most recent 'Thought'
//GET api/blog/thought
exports.getRecentThought = async (req, res) => {
    try {
        const blog = await Blog.findOne({ type: 'thought' }).sort({
            createdAt: -1,
        });

        return res.status(200).json(blog);
    } catch (err) {
        return res.status(400).json({
            errors: [{ msg: 'Blog server error' }],
        });
    }
};

//Get 6 Blogs for /blogs page pagination
//GET api/blog/limit/
exports.getLimitedBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        const blogs = await Blog.find().skip(skip).limit(limit);
        const totalBlogs = await Blog.countDocuments();

        res.json({
            blogs,
            totalPages: Math.ceil(totalBlogs / limit),
            currentPage: page,
        });
    } catch (err) {
        return res.status(400).json({
            errors: [{ msg: 'Blog server error' }],
        });
    }
};

// Search Route: Fetch blogs that match search query
exports.searchBlogs = async (req, res) => {
    try {
        const query = req.query.q || '';
        const searchRegex = new RegExp(query, 'i'); // Case-insensitive search

        const blogs = await Blog.find({
            $or: [{ title: searchRegex }, { body: searchRegex }],
        });

        res.json(blogs);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

//Get single Blog by ID
//GET api/blog/:id
exports.getSingleBlogById = async (req, res) => {
    let blogId = req.params.id;

    try {
        let blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(400).json({
                errors: [{ msg: 'no blog found' }],
            });
        }

        res.status(200).json([blog]);
    } catch (err) {
        return res.status(400).json({
            errors: [{ msg: 'Blog server error' }],
        });
    }
};

//Get 5 random blogs
//GET api/blog/random
exports.getRandomBlogs = async (req, res) => {
    try {
        const randomBlogs = await Blog.aggregate([{ $sample: { size: 6 } }]); // Get  random blogs

        res.json(randomBlogs);
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
        // author: id,
        ...req.body,
    };

    try {
        //Get author by ID
        const author = await User.findById(id, 'username avatar');

        const blog = new Blog({
            userName: author.username,
            avatar: author.avatar,
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
//PUT /api/blog/updateblog/:blogid
exports.updateBlog = async (req, res) => {
    let userId = req.user.id;
    let blogId = req.params.blogid;
    let blogFields = req.body;

    try {
        // Check if blog exists
        let blog = await Blog.findById(blogId);

        let user = await User.findById(userId);

        if (!blog) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'No blog found to update.' }] });
        }

        //check if blog belongs to currently logged in user
        if (userId === blog.author.toString() || user.isAdmin === true) {
            let updatedBlog = await Blog.findByIdAndUpdate(
                blogId,
                { $set: blogFields },
                { new: true }
            );

            return res.status(200).json(updatedBlog);
        } else {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Blog does not belong to current user or user is not admin.',
                    },
                ],
            });
        }
    } catch (err) {
        return res.status(400).json({
            errors: [{ msg: 'Blog server error.' }],
        });
    }
};

//PRIVATE AUTH
//Delete Blog by ID
//DELETE /api/blog/deleteblog/:blogid
exports.deleteBlog = async (req, res) => {
    let blogId = req.params.blogid;
    try {
        let blog = await Blog.findByIdAndDelete(blogId);

        !blog
            ? res.status(400).json({ msg: 'Blog not found' })
            : res.status(200).json({ msg: 'Blog successfully deleted' });
    } catch (err) {
        return res.status(400).json({
            errors: [{ msg: 'Blog delete error.' }],
        });
    }
};

//PRIVATE AUTH
//Comment on Blog
//POST /api/blog/comment/:blogId
exports.commentBlog = async (req, res) => {
    let userId = req.user.id;
    let blogId = req.params.blogid;

    try {
        // Check of blog exists
        let user = await User.findById(userId).select('-password');
        let blog = await Blog.findById(blogId);

        if (!blog || !user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'No user or blog err' }] });
        }

        const newComment = {
            userId: userId,
            name: user.username,
            avatar: user.avatar,
            text: req.body.commentData,
        };

        //add the comment with unshift to keep most recently added comment at the top of the array.
        blog.comments.unshift(newComment);

        await blog.save();

        return res.status(200).json([blog]);
    } catch (err) {
        return res.status(400).json({
            errors: [{ msg: 'Error in commentBlog' }],
        });
    }
};

//PRIVATE AUTH
//Delete Comment on Blog
//Delete /api/blog/comment/:blogId/:commentId
exports.deleteComment = async (req, res) => {
    let blogId = req.params.blogid;
    let commentId = req.params.commentid;
    let userId = req.user.id;

    try {
        let blog = await Blog.findById(blogId);
        let user = await User.findById(userId).select('-password');

        const comment = blog.comments.find(
            (comment) => commentId === comment.id
        );

        // Make sure comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }

        // check if user deleting comment is currently logged in user or Admin
        if (comment.userId.toString() === userId || user.isAdmin) {
            let updatedBlog = await Blog.findOneAndUpdate(
                { _id: blogId },
                { $pull: { comments: { _id: commentId } } },
                { safe: true, multi: false, new: true }
            );

            return res.status(200).json({
                id: updatedBlog.id,
                comments: updatedBlog.comments,
            });
        }
    } catch (err) {
        return res.status(400).json({
            errors: [{ msg: 'Error in commentBlog' }],
        });
    }
};

//PRIVATE AUTH
//Add a 'Like' or 'unlike' to a Blog
//PUT /api/blog/likeblog/:blogid/:selection
exports.likeBlog = async (req, res) => {
    let userId = req.user.id;
    let blogId = req.params.blogid;
    let selection = req.params.selection;

    try {
        let blog = await Blog.findById(blogId);

        //check if current user already has a like in this blog
        const like = blog.likes.find((like) => like.user.toString() === userId);

        //if user does not have a like/unlike, allow like/unlike
        if (!like) {
            blog.likes.push({ user: userId, selection: selection });
            await blog.save();
            return res.status(200).json({ id: blog._id, likes: blog.likes });
        }

        //if user does have something, check if like/unlike and switch user selection
        if (like.selection !== selection) {
            await Blog.findOneAndUpdate(
                { _id: blogId },
                { $pull: { likes: { _id: like.id } } },
                { safe: true, multi: false }
            );

            let blog = await Blog.findById(blogId);

            blog.likes.push({
                user: userId,
                selection: selection !== 'non' ? selection : 'non',
            });
            await blog.save();

            return res.status(200).json({ id: blog._id, likes: blog.likes });
        } else {
            return res.status(400).json({
                errors: [{ msg: `Unable to ${selection} more then once.` }],
            });
        }
    } catch (err) {
        return res.status(400).json({
            errors: [{ msg: 'Like blog server error.' }],
        });
    }
};

//PRIVATE AUTH
//check if user has a like/unlike in this blog
//PUT /api/blog/checklike/:blogID
exports.checklike = async (req, res) => {
    let userId = req.user.id;
    let blogId = req.params.blogid;

    try {
        let blog = await Blog.findById(blogId);

        //check if current user already has a like in this blog
        const like = blog.likes.find((like) => like.user.toString() === userId);

        if (like) {
            return res.status(200).json(like.selection);
        }

        return res.status(200).json('non');
    } catch (err) {
        return res.status(400).json({
            errors: [{ msg: 'Like blog server error.' }],
        });
    }
};
