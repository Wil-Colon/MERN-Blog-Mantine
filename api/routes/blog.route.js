const router = require('express').Router();
const auth = require('../middleware/auth');
const {
    getAllBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    commentBlog,
    deleteComment,
    likeBlog,
    checklike,
    getLimitedBlogs,
    getSingleBlogById,
    getRandomBlogs,
    getRecentThought,
} = require('../controllers/blog.controller');

//GET All blogs
router.get('/', getAllBlogs);

//Get the most recent 'Thought'
//GET api/blog/thought
router.get('/thought', getRecentThought);

//Get 6 Blogs for /blogs page pagination
//GET api/blog/limit/
router.get('/limit', getLimitedBlogs);

//Get single Blog by ID
//api/blog/:id
router.get('/:id', getSingleBlogById);

//Get random 5 blogs
//api/blog/random
router.get('/random/list', getRandomBlogs);

//Private
//Create Blog
//Post /api/blog/createblog
router.post('/createblog', auth, createBlog);

//Private
//UpdateBlog
//Put /api/blog/updateblog/:blogid
router.put('/updateblog/:blogid', auth, updateBlog);

//Private
//Delete Blog by ID
//Delete /api/blog/deleteblog/:blogid
router.delete('/deleteblog/:blogid', auth, deleteBlog);

//PRIVATE AUTH
//Comment on Blog
//Put /api/blog/comment/:blogId
router.post('/commentblog/:blogid', auth, commentBlog);

//PRIVATE AUTH
//Delete comment on Blog
//DELETE /api/blog/deletecomment/:blogId/:commentId
router.delete('/deletecomment/:blogid/:commentid', auth, deleteComment);

//PRIVATE AUTH
//Add a 'Like' to a Blog
//PUT /api/blog/likeblog/:blogid
router.put('/likeblog/:blogid/:selection', auth, likeBlog);

//PRIVATE AUTH
//check if user has a like/unlike in this blog
//PUT /api/blog/checklike/:blogID
router.get('/checklike/:blogid', auth, checklike);

module.exports = router;
