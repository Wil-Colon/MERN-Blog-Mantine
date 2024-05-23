import axios from 'axios';
import {
    getUserProfileStart,
    getUserProfileSuccess,
    getUserProfileError,
    getAllProfilesStart,
    getAllProfilesSuccess,
    getAllProfilesError,
    updateUserProfileStart,
    updateUserProfileSuccess,
    updateUserProfileFailure,
} from '../profile/profileSlice';
import setAuthToken from '../../utils/setAuthToken';

//Get Currently Logged in Users Profile
export const getCurrentProfile = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    dispatch(getUserProfileStart());

    try {
        const res = await axios.get('http://localhost:3000/api/profile/me');

        dispatch(getUserProfileSuccess(res.data));
    } catch (err) {
        const errors = err.response.data.errors;

        dispatch(getUserProfileError(errors[0]));
    }
};

export const updateProfile = (profileInfo) => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    dispatch(updateUserProfileStart());
    try {
        const res = await axios.put(
            'http://localhost:3000/api/profile/updateprofile',
            { profileInfo }
        );
    } catch (err) {
        const errors = err.response.data.errors;

        dispatch(updateUserProfileFailure(errors));
    }
};
