import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from '../redux/store';

import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        !user?.currentUser?.isAdmin && navigate('/');
    }, [navigate, user?.currentUser, dispatch]);

    return <h1>ADMIN BOARD</h1>;
}
