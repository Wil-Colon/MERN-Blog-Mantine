import axios from 'axios';
import {
    signInFailure,
    signInStart,
    signInSuccess,
    getUserStart,
    getUserSuccess,
    getUserFailure,
    logOutUser,
    userRegisterStart,
    userRegisterSuccess,
    userRegisterFailure,
} from '../user/userSlice';
import setAuthToken from '../../utils/setAuthToken';

//Login User
export const userLogin = (formData) => async (dispatch) => {
    dispatch(signInStart());

    try {
        const res = await axios.post(
            'http://localhost:3000/api/user/login',
            formData
        );
        dispatch(signInSuccess(res.data));
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch(signInFailure(errors));
    }
};

//load logged in Users Data
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    dispatch(getUserStart());

    try {
        const res = await axios.get('http://localhost:3000/api/user');

        res.data === null
            ? dispatch(getUserFailure())
            : dispatch(getUserSuccess(res.data));
    } catch (err) {
        // localStorage.removeItem('token');
        // const errors = err.response.data.errors;
        // dispatch(getUserFailure(errors));
        dispatch(logOutUser());
    }
};

//logout user
export const logOut = () => (dispatch) => {
    dispatch(logOutUser());
};

export const userRegister = (formdata) => async (dispatch) => {
    dispatch(userRegisterStart());

    try {
        const res = await axios.post(
            'http://localhost:3000/api/auth/register',
            formdata
        );
        dispatch(userRegisterSuccess(res.data));
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch(userRegisterFailure(errors));
    }
};
