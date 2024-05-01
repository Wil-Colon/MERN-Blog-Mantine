import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import Home from '../../pages/Home';

interface PrivateRouteProps {
    path: string;
    component: any;
}

const PrivateRoute = ({ path, component }: PrivateRouteProps) => {
    const navigate = useNavigate();

    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // const isLoading = useSelector((state) => state.auth.loading);

    const isLoading = useSelector((state: RootState) => state?.loading);
    const user = useSelector((state: RootState) => state.user.currentUser);

    // return !isLoading && user !== null ? (
    //     <Route path={path} element={component} />
    // ) : (
    //     <Route path="/" element={<Home />} />
    // );
    return (
        <>
            <Route path="/" element={<Home />} />;
        </>
    );
};

export default PrivateRoute;
