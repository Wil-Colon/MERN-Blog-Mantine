import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
import { Fragment, useEffect } from 'react';
import { getCurrentProfile } from '../redux/actions/profiles';
import { Skeleton } from '@mantine/core';
import UserDash from '../components/UserDashboard/UserDashboard';

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
            {profile.error !== false ? (
                <p>{profile.error.msg}</p>
            ) : (
                <div>
                    {' '}
                    <UserDash />
                </div>
            )}
        </Fragment>
    ) : (
        <>
            <Skeleton height={50} circle mb="xl" />
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </>
    );
}
