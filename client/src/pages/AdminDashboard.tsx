import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader/AdminHeader';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const [activeLink, setActiveLink] = useState('/stats');

    useEffect(() => {
        !user?.currentUser?.isAdmin
            ? navigate('/')
            : navigate(`/admin${activeLink}`);
    }, [navigate, user?.currentUser, activeLink, dispatch]);

    console.log(activeLink);

    return (
        <>
            <AdminHeader activeLink={setActiveLink} />
            {activeLink === '/stats' ? (
                <h1>Stats</h1>
            ) : activeLink === '/blog' ? (
                <h1>Blogs</h1>
            ) : activeLink === '/thought' ? (
                <h1>Thoughts</h1>
            ) : activeLink === '/community' ? (
                <h1>community</h1>
            ) : null}
        </>
    );
}
