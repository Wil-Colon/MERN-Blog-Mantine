import HomePageBlogContainer from '../components/HomePageBlogContainer/HomePageBlogContainer';
import Hero from '../components/Hero/Hero';

import { useEffect, useState } from 'react';

export default function Home() {
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
