import axios from 'axios';
import {
    getBlogsError,
    getBlogsStart,
    getBlogsSuccess,
    likeBlogStart,
    likeBlogSuccess,
    likeBlogFailure,
    addCommentStart,
    addCommentSuccess,
    addCommentFailure,
    deleteCommentStart,
    deleteCommentSuccess,
    getSingleBlogStart,
    getSingleBlogSuccess,
    getSingleBlogError,
    deleteCommentFailure,
    getRecentBlogsStart,
    getRecentBlogsSuccess,
    getRecentBlogsError,
} from '../blog/blogSlice';
import setAuthToken from '../../utils/setAuthToken';

//Get recent 6 blogs in order for home page
export const getRecentBlogs = () => async (dispatch) => {
    dispatch(getRecentBlogsStart());

    try {
        const res = await axios.get(
            'http://localhost:3000/api/blog/getrecentblogs/'
        );

        dispatch(getRecentBlogsSuccess(res.data));

        return res.data;
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch(getRecentBlogsError(errors[0]));
    }
};

//Get all blogs
export const getAllBlogs = () => async (dispatch) => {
    dispatch(getBlogsStart());

    try {
        const res = await axios.get('http://localhost:3000/api/blog/');

        dispatch(getBlogsSuccess(res.data));

        return res.data;
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch(getBlogsError(errors[0]));
    }
};

//Get recent 'Thought'
//Used for Home page hero
export const getRecentThought = async () => {
    try {
        const res = await axios.get('http://localhost:3000/api/blog/thought');

        return res.data;
    } catch (err) {
        console.error('Error fetching random blogs:', error);
    }
};

//Get Single Blog by ID
export const getSingleBlogById = (blogId) => async (dispatch) => {
    dispatch(getSingleBlogStart());
    try {
        const res = await axios.get(`http://localhost:3000/api/blog/${blogId}`);
        dispatch(getSingleBlogSuccess(res.data));
        return res.data;
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch(getSingleBlogError(errors[0]));
    }
};

export const getRandomBlogs = async () => {
    try {
        const res = await axios.get(
            'http://localhost:3000/api/blog/random/list'
        );
        return res.data;
    } catch (error) {
        console.error('Error fetching random blogs:', error);
    }
};

//Check if user has liked blog
export const checkLikes = async (blogId) => {
    let errors;
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get(
            `http://localhost:3000/api/blog/checklike/${blogId}`
        );

        return res.data;
    } catch (err) {
        errors = err.response.data.errors;
        return errors;
    }
};

//Like/unlike blog
export const likeButton = (blogId, selection) => async (dispatch) => {
    let errors;

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    dispatch(likeBlogStart());
    try {
        const res = await axios.put(
            `http://localhost:3000/api/blog/likeblog/${blogId}/${selection}`
        );

        dispatch(likeBlogSuccess(res.data));
        return res.data;
    } catch (err) {
        errors = err.response.data.errors;
        dispatch(likeBlogFailure(errors[0]));
        return errors;
    }
};

//Add a comment to a blog
export const addComment = (blogId, commentData) => async (dispatch) => {
    let errors;

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    dispatch(addCommentStart());
    try {
        const res = await axios.post(
            `http://localhost:3000/api/blog/commentblog/${blogId}`,
            { commentData }
        );

        dispatch(addCommentSuccess(res.data));
        return res.data;
    } catch (err) {
        errors = err.response.data.errors;
        dispatch(addCommentFailure(errors[0]));
        return errors;
    }
};

//Delete a comment from a blog
export const deleteComment = (blogId, commentId) => async (dispatch) => {
    let errors;

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    dispatch(deleteCommentStart());
    try {
        const res = await axios.delete(
            `http://localhost:3000/api/blog/deletecomment/${blogId}/${commentId}`
        );

        dispatch(deleteCommentSuccess(res.data));
        return res.data;
    } catch (err) {
        errors = err.response.data.errors;
        dispatch(deleteCommentFailure(errors[0]));
        return errors;
    }
};
