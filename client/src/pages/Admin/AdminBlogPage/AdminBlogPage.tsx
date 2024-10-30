import './adminblogpage.scss';
import type { RootState } from '../../../redux/store';
import BodyContainer from '../../../components/BodyContainer/BodyContainer';
import BlogCard from '../../../components/BlogCard/BlogCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllBlogs } from '../../../redux/actions/blog';
import { SimpleGrid, Text } from '@mantine/core';
import ThoughtCard from '../../../components/ThoughtCard/ThoughtCard';
import { Link } from 'react-router-dom';

export default function AdminBlogPage() {
    const dispatch = useDispatch();
    const blogs = useSelector((state: RootState) => state.blogs.blogs);

    useEffect(() => {
        dispatch(getAllBlogs());
    }, [dispatch]);

    return blogs !== null ? (
        <BodyContainer size={'xl'} fluid={false} pb={50}>
            <Text>Current Blogs</Text>

            <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 3 }}
                spacing={{ base: 10, sm: 'xl' }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}
            >
                {blogs.map((blog) =>
                    blog.type === 'blog' ? (
                        <Link key={blog._id} to={`edit/${blog._id}`}>
                            <BlogCard blogData={blog} />
                        </Link>
                    ) : (
                        <Link key={blog._id} to={`edit/${blog._id}`}>
                            <ThoughtCard blogData={blog} />
                        </Link>
                    )
                )}
            </SimpleGrid>
        </BodyContainer>
    ) : (
        <>
            <h1>loading</h1>
        </>
    );
}
