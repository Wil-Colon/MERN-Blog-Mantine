import HomePageBlogContainer from '../components/HomePageBlogContainer/HomePageBlogContainer';
import Hero from '../components/Hero/Hero';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllBlogs, getRecentThought } from '../redux/actions/blog';
import type { RootState } from '../redux/rootReducer';

export default function Home() {
    const dispatch = useDispatch();
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
    const [selectedThought, setSelectedThought] = useState(null);

    useEffect(() => {
        const fetchRecentThought = async () => {
            const res = await getRecentThought();
            setSelectedThought(res);
        };
        fetchRecentThought();
    }, []);

    return (
        <>
            <Hero selectedThought={selectedThought} />
            <HomePageBlogContainer setSelectedThought={setSelectedThought} />
        </>
    );
}
