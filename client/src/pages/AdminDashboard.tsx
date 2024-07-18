import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader/AdminHeader';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const location = window.location.pathname.slice(6);

    const [activeLink, setActiveLink] = useState(location);

    console.log(activeLink);

    // useEffect(() => {
    //     !user?.currentUser?.isAdmin
    //         ? navigate('/')
    //         : window.history.pushState({}, undefined, `/admin${activeLink}`);
    // }, [navigate, user?.currentUser, activeLink, dispatch]);

    // console.log(activeLink);

    return (
        <>
            <AdminHeader activeLink={setActiveLink} />
            {activeLink === '/stats' ? (
                // <h1>Stats</h1>
                <title>stats</title>
            ) : activeLink === '/blog' ? (
                <title>Blogs</title>
            ) : activeLink === '/thought' ? (
                <h1>Thoughts</h1>
            ) : activeLink === '/community' ? (
                <h1>community</h1>
            ) : null}
        </>
    );
}
