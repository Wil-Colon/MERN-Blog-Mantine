import './adminblogpage.scss';
import BlogsList from '../../BlogList/BlogsList';
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function AdminBlogPage() {
    return (
        <>
            <Link to="/admin/createblog">
                <Button justify="center" variant="outline">
                    Create Blog
                </Button>
            </Link>
            <BlogsList edit={true} />
        </>
    );
}
