import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { Fragment, useEffect } from 'react';
import { getCurrentProfile } from '../redux/actions/profiles';

export default function UserDashBoard() {
    const dispatch = useDispatch();
    const profile = useSelector((state: RootState) => state.profile);

    useEffect(() => {
        dispatch(getCurrentProfile());
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(loadUser());
    // }, [dispatch]);

    return profile.loading === false ? (
        <Fragment>
            userprofile of:
            <p>
                {profile.error !== false
                    ? profile.error.msg
                    : 'here is ur empty frggn profile for now'}
            </p>
        </Fragment>
    ) : (
        <p>LOADING</p>
    );
}
