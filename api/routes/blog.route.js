const router = require('express').Router();
const auth = require('../middleware/auth');
const {
    getAllBlogs,
    createBlog,
    updateBlog,
    getSingleBlog,
} = require('../controllers/blog.controller');

//GET All blogs
router.get('/', getAllBlogs);

//Get single Blog by ID
//api/blog/:id
router.get('/:id', getSingleBlog);

//Create Blog
//Post /api/blog/createblog
router.post('/createblog', auth, createBlog);

//UpdateBlog
//Put /api/blog/updateblog/:blogid
router.put('/updateblog/:blogid', auth, updateBlog);

module.exports = router;
