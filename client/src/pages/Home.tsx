import HomePageBlogContainer from '../components/HomePageBlogContainer/HomePageBlogContainer';
import Hero from '../components/Hero/Hero';
import type { RootState } from '../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllBlogs } from '../redux/actions/blog';

export default function Home() {
    const dispatch = useDispatch();
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
    const [selectedThought, setSelectedThought] = useState(null);

    useEffect(() => {
        blogs === null
            ? dispatch(getAllBlogs())
            : setSelectedThought(blogs.find((blog) => blog.type === 'thought'));
    }, [blogs, dispatch]);

    useEffect(() => {
        selectedThought !== null &&
            setSelectedThought(
                blogs.find((blog) => blog._id === selectedThought._id)
            );
    }, [selectedThought, blogs]);

    return (
        <>
            <Hero selectedThought={selectedThought} />
            <HomePageBlogContainer
                blogs={blogs}
                setSelectedThought={setSelectedThought}
            />
        </>
    );
}
