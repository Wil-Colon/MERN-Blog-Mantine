import { useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentProfile } from '../redux/actions/profiles';

export default function UserProfile() {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(getCurrentProfile());
    }, []);

    return (
        <Fragment>
            userprofile of:
            <p>{}</p>
        </Fragment>
    );
}
