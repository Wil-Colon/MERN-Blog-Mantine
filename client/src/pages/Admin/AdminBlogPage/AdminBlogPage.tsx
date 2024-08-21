import BodyContainer from '../../../components/BodyContainer/BodyContainer';
import './adminblogpage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../../../redux/store';
import { getAllBlogs } from '../../../redux/actions/blog';
import HomePageBlogContainer from '../../../components/HomePageBlogContainer/HomePageBlogContainer';
import BlogCard from '../../../components/BlogCard/BlogCard';
import { SimpleGrid, Text } from '@mantine/core';

export default function AdminBlogPage() {
    const dispatch = useDispatch();
    const blogs = useSelector((state: RootState) => state.blogs.blogs);

    useEffect(() => {
        dispatch(getAllBlogs());
    }, [dispatch]);

    return blogs !== null ? (
        <BodyContainer size={'xxl'}>
            <Text>Current Blogs</Text>

            <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 3 }}
                spacing={{ base: 10, sm: 'xl' }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}
            >
                {blogs.map((blog) => (
                    <BlogCard key={blog._id} blogData={blog} />
                ))}
            </SimpleGrid>
        </BodyContainer>
    ) : (
        <>
            <h1>loading</h1>
        </>
    );
}
