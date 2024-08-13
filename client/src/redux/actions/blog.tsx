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

// export const updateProfile = (profileInfo) => async (dispatch) => {
//     if (localStorage.token) {
//         setAuthToken(localStorage.token);
//     }
//     dispatch(updateUserProfileStart());
//     try {
//         const res = await axios.put(
//             'http://localhost:3000/api/profile/updateprofile',
//             { ...profileInfo }
//         );
//         dispatch(updateUserProfileSuccess(res.data));

//         notifications.show({
//             withCloseButton: true,
//             autoClose: 5000,
//             title: 'Successful!',
//             message: 'Profile has been updated.',
//             color: 'indigo',
//             loading: false,
//         });
//     } catch (err) {
//         const errors = err.response.data.errors;
//         notifications.show({
//             withCloseButton: true,
//             autoClose: 5000,
//             title: 'Unsuccessful!',
//             message: 'Profile update error!',
//             color: 'red',
//             loading: false,
//         });
//         dispatch(updateUserProfileFailure(errors));
//     }
// };
