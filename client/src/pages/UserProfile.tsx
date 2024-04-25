import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../redux/actions/auth';
import { Fragment, useEffect } from 'react';
import store, { RootState } from './redux/store';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(loadUser());
    // }, [dispatch]);

    return (
        <Fragment>
            <p>UserProfile</p>
            <p>UserProfile</p>
            <p>UserProfile</p>
            <p>UserProfile</p>
            <p>UserProfile</p>
            <p>UserProfile</p>
            <p>UserProfile</p>
        </Fragment>
    );
}
