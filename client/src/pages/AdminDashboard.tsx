import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader/AdminHeader';
import AdminBlogPage from '../components/AdminBlogPage/AdminBlogPage';
import AdminStatsPage from '../components/AdminStatsPage/AdminStatsPage';
import AdminThoughtsPage from '../components/AdminThoughtsPage/AdminThoughtsPage';
import AdminCommunityPage from '../components/AdminCommunityPage/AdminCommunityPage';
import { Transition } from '@mantine/core';
import BodyContainer from '../components/BodyContainer/BodyContainer';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const location = window.location.pathname.slice(6);
    const [activeLink, setActiveLink] = useState(location);

    const [transitionOpened, setTransitionOpened] = useState(false);

    useEffect(() => {
        setTransitionOpened(false);
        setTimeout(() => {
            setTransitionOpened(true);
        }, 200);
    }, [activeLink]);

    return (
        <>
            <AdminHeader activeLink={setActiveLink} />
            <BodyContainer size="xs" fluid>
                <Transition
                    mounted={transitionOpened}
                    transition="fade-left"
                    duration={200}
                    timingFunction="ease"
                    exitDuration={0}
                >
                    {(styles) => (
                        <div style={styles}>
                            {activeLink === '/stats' ? (
                                <AdminStatsPage />
                            ) : activeLink === '/blog' ? (
                                <AdminBlogPage />
                            ) : activeLink === '/thought' ? (
                                <AdminThoughtsPage />
                            ) : activeLink === '/community' ? (
                                <AdminCommunityPage />
                            ) : null}
                        </div>
                    )}
                </Transition>
            </BodyContainer>
        </>
    );
}
