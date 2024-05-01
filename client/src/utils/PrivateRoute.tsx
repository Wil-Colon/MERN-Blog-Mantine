import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

export default function PrivateRoute() {
    const user = useSelector((state: RootState) => state?.user?.currentUser);

    return user !== null ? <Outlet /> : <Navigate to="/login" />;
}
