import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../redux/rootReducer';

export default function PrivateRoute() {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state?.user?.currentUser);

    useEffect(() => {
        localStorage?.token === undefined && navigate(`/login`);
    }, [localStorage?.token]);

    return user !== null && <Outlet />;
}
