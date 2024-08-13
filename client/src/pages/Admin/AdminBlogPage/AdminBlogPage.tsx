import BodyContainer from '../../../components/BodyContainer/BodyContainer';
import './adminblogpage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../../../redux/store';
import { getAllBlogs } from '../../../redux/actions/blog';

export default function AdminBlogPage() {
    const dispatch = useDispatch();
    const blogs = useSelector((state: RootState) => state.blogs);

    useEffect(() => {
        dispatch(getAllBlogs());
    }, []);

    return (
        <BodyContainer size="xs" fluid>
            <h1>Future home of blog lists with edit button</h1>
        </BodyContainer>
    );
}
