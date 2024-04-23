import axios from 'axios';
import {
    signInFailure,
    signInStart,
    signInSuccess,
    getUserStart,
    getUserSuccess,
    getUsersFailure,
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

        // if (errors) {
        //     errors.forEach((error) =>
        //         dispatch(setAlert(error.msg, 'danger', 3000))
        //     );
        // }

        dispatch(signInFailure(errors));
    }
};

export const userRegister = (formdata) => async (dispatch) => {
    console.log('poop');
};

export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    dispatch(getUserStart());

    try {
        const res = await axios.get('http://localhost:3000/api/user');

        dispatch(getUserSuccess(res.data));
    } catch (err) {
        const errors = err.response.data.errors;
        dispatch(getUsersFailure(errors));
    }
};
