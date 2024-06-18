import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute() {
    const user = useSelector((state: RootState) => state?.user?.currentUser);
    console.log(user);

    return user === null ? (
        <h1>Loading</h1>
    ) : user.currentUser !== null ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
}
