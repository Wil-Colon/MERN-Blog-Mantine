import axios from 'axios';
import {
    getBlogsError,
    getBlogsStart,
    getBlogsSuccess,
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

//Like blog
export const likeButton = async (blogId) => {
    let errors;
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.put(
            `http://localhost:3000/api/blog/likeblog/${blogId}`
        );

        return res.data;
    } catch (err) {
        errors = err.response.data.errors;
        return errors;
    }
};

//unLike blog
export const unLikeButton = async (blogId) => {
    let errors;
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.put(
            `http://localhost:3000/api/blog/unlikeblog/${blogId}`
        );

        return res.data;
    } catch (err) {
        errors = err.response.data.errors;
        return errors;
    }
};
