import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../redux/actions/auth';
import { Fragment, useEffect, useState } from 'react';
import type { RootState } from '../redux/store';

import { useNavigate } from 'react-router-dom';
import { Loader } from '@mantine/core';

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (user.currentUser !== null) {
            if (!user?.currentUser?.isAdmin) {
                navigate('/');
            } else {
                setLoading(false);
            }
        } else {
            navigate('/');
        }
    }, [loading, navigate, user?.currentUser, dispatch]);

    return !loading ? (
        <Fragment>
            <div>ADMIN DASHBOARD</div>
        </Fragment>
    ) : (
        <Loader />
    );
}
