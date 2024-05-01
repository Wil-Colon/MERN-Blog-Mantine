import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../redux/actions/auth';
import { Fragment, useEffect } from 'react';
import store, { RootState } from './redux/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentProfile } from '../redux/actions/profiles';

export default function UserProfile() {
    const location = useLocation();
    const { hash, pathname, search } = location;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentProfile());
    }, []);

    console.log(pathname);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(loadUser());
    // }, [dispatch]);

    return (
        <Fragment>
            userprofile of:
            <p>{}</p>
        </Fragment>
    );
}
