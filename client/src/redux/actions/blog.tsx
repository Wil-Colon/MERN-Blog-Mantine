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
} from '../blog/blogSlice';
import setAuthToken from '../../utils/setAuthToken';

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

//Like/unlike blog
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
