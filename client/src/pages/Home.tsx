import HomePageBlogContainer from '../components/HomePageBlogContainer/HomePageBlogContainer';
import Hero from '../components/Hero/Hero';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllBlogs } from '../redux/actions/blog';
import type { RootState } from '../redux/rootReducer';

export default function Home() {
    const dispatch = useDispatch();
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
    const [selectedThought, setSelectedThought] = useState(null);

    useEffect(() => {
        blogs === null
            ? dispatch(getAllBlogs())
            : setSelectedThought(blogs.find((blog) => blog.type === 'thought'));

        selectedThought !== null &&
            setSelectedThought(
                blogs.find((blog) => blog._id === selectedThought._id)
            );
    }, [blogs, dispatch]);

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
