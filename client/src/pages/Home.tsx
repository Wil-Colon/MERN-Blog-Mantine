import HomePageBlogContainer from '../components/HomePageBlogContainer/HomePageBlogContainer';
import Hero from '../components/Hero/Hero';
import BodyContainer from '../components/BodyContainer/BodyContainer';
import { useEffect, useState } from 'react';
import { getRecentBlogs, getRecentThought } from '../redux/actions/blog';
import { Loader } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';

export default function Home() {
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
    const dispatch = useDispatch();
    const [selectedThought, setSelectedThought] = useState(null);

    useEffect(() => {
        dispatch(getRecentBlogs());

        const fetchRecentThought = async () => {
            const res = await getRecentThought();
            setSelectedThought(res);
        };
        fetchRecentThought();
    }, [dispatch]);

    if (blogs === null || blogs.length < 6) {
        return (
            <BodyContainer size="xs" fluid pb>
                <Loader />
            </BodyContainer>
        );
    }

    return (
        <>
            <Hero selectedThought={selectedThought} />
            <HomePageBlogContainer
                setSelectedThought={setSelectedThought}
                blogs={blogs}
            />
        </>
    );
}
