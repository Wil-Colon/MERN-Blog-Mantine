import BodyContainer from '../../../components/BodyContainer/BodyContainer';
import './adminblogpage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../../../redux/store';
import { getAllBlogs } from '../../../redux/actions/blog';
import HomePageBlogContainer from '../../../components/HomePageBlogContainer/HomePageBlogContainer';
import BlogCard from '../../../components/BlogCard/BlogCard';
import { Text } from '@mantine/core';

export default function AdminBlogPage() {
    return (
        <>
            <Text>Current Blogs</Text>
            <HomePageBlogContainer alt={true}>
                <BlogCard id={'2'} />
            </HomePageBlogContainer>
        </>
    );
}
