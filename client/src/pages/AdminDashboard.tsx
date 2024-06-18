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
        !user?.currentUser?.isAdmin && navigate('/');
    }, [navigate, user?.currentUser, dispatch]);

    return user.currentUser !== null ? <h1>ADMIN BOARD</h1> : <h1>LOADING</h1>;

    // return <h1>ADMING</h1>;
}
