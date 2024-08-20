import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import AdminBlogPage from '../AdminBlogPage/AdminBlogPage';
import AdminStatsPage from '../AdminStatsPage/AdminStatsPage';
import AdminThoughtsPage from '../../../components/AdminThoughtsPage/AdminThoughtsPage';
import AdminCommunityPage from '../AdminCommunityPage/AdminCommunityPage';
import BodyContainer from '../../../components/BodyContainer/BodyContainer';
import { getAllBlogs } from '../../../redux/actions/blog';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const blogs = useSelector((state: RootState) => state.blogs);
    const location = window.location.pathname.slice(6);
    const [activeLink, setActiveLink] = useState(location);

    useEffect(() => {
        dispatch(getAllBlogs());
    }, []);

    return (
        <>
            <AdminHeader activeLink={setActiveLink} />
            <title>{`Admin ${activeLink
                .charAt(1)
                .toUpperCase()}${activeLink.slice(2)}`}</title>

            <BodyContainer size="xs" fluid>
                <div>
                    {activeLink === '/stats' ? (
                        <AdminStatsPage />
                    ) : activeLink === '/blog' ? (
                        <AdminBlogPage />
                    ) : activeLink === '/community' ? (
                        <AdminCommunityPage />
                    ) : null}
                </div>
            </BodyContainer>
        </>
    );
}
