import axios from 'axios';
import {
    getUserProfileStart,
    getUserProfileSuccess,
    getUserProfileError,
    getAllProfilesStart,
    getAllProfilesSuccess,
    getAllProfilesError,
} from '../profile/profileSlice';
import setAuthToken from '../../utils/setAuthToken';
import { useEffect } from 'react';

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
