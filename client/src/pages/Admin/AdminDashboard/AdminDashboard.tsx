import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import AdminBlogPage from '../AdminBlogPage/AdminBlogPage';
import AdminStatsPage from '../AdminStatsPage/AdminStatsPage';
import AdminCommunityPage from '../AdminCommunityPage/AdminCommunityPage';
import BodyContainer from '../../../components/BodyContainer/BodyContainer';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
    const location = window.location.pathname.slice(6);
    const [activeLink, setActiveLink] = useState(location);

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
