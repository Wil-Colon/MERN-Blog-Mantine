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
import { notifications } from '@mantine/notifications';

//Get Currently Logged in Users Profile
export const getCurrentProfile = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    dispatch(getUserProfileStart());

    try {
        const res = await axios.get('http://localhost:3000/api/profile/me');

        dispatch(getUserProfileSuccess(res.data));

        return res.data;
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
            { ...profileInfo }
        );
        dispatch(updateUserProfileSuccess(res.data));

        notifications.show({
            withCloseButton: true,
            autoClose: 5000,
            title: 'Successful!',
            message: 'Profile has been updated.',
            color: 'indigo',
            loading: false,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        notifications.show({
            withCloseButton: true,
            autoClose: 5000,
            title: 'Unsuccessful!',
            message: 'Profile update error!',
            color: 'red',
            loading: false,
        });
        dispatch(updateUserProfileFailure(errors));
    }
};
export const getProfileByID = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3000/api/profile/${id}`);

        return res.data;
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch(getUserProfileError(errors[0]));
    }
};
