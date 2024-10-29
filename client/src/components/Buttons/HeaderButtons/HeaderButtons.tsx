import { Button } from '@mantine/core';
import './headerButtons.scss';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';

export default function HeaderButtons() {
    const user = useSelector((state: RootState) => state.user);
    const path = useLocation().pathname;

    return (
        <div className="button">
            <Link to="/">
                <Button
                    className={`${
                        path === '/'
                            ? 'button__link-item--active'
                            : 'button__link-item'
                    }`}
                    variant="transparent"
                >
                    Home
                </Button>
            </Link>
            <Link to="/about">
                <Button
                    className={`${
                        path === '/about'
                            ? 'button__link-item--active'
                            : 'button__link-item'
                    }`}
                    variant="transparent"
                >
                    About
                </Button>
            </Link>
            <Link to="/blogs">
                <Button
                    className={`${
                        path === '/blogs'
                            ? 'button__link-item--active'
                            : 'button__link-item'
                    }`}
                    variant="transparent"
                >
                    Blogs
                </Button>
            </Link>
            {user?.currentUser !== null &&
                user?.currentUser?.isAdmin === true && (
                    <Link to="/admin/stats">
                        <Button
                            className={`${
                                path.includes('/admin')
                                    ? 'button__link-item--active'
                                    : 'button__link-item'
                            }`}
                            variant="transparent"
                        >
                            Admin
                        </Button>
                    </Link>
                )}
        </div>
    );
}
