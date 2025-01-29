import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import {
    Paper,
    Text,
    Title,
    Button,
    useMantineTheme,
    rem,
} from '@mantine/core';
import classes from './blogCarousel.module.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { Link } from 'react-router-dom';
import { getRandomBlogs } from '../../redux/actions/blog';

interface CardProps {
    blog: any;
}

interface BlogCarouselProps {
    currentBlogId: string;
}

function Card({ blog }: CardProps) {
    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            style={{ backgroundImage: `url(${blog.coverPhoto})` }}
            className={classes.card}
        >
            <div>
                <Text className={classes.category} size="xs">
                    {blog.type}
                </Text>
                <Title order={3} className={classes.title}>
                    {blog.title}
                </Title>
            </div>
            <Link
                to={`/blogs/${blog?.title
                    .replace(/ /g, '-')
                    .replace(/[.,!?;]/g, '')}`}
                state={blog}
            >
                <Button variant="white" color="dark">
                    Read article
                </Button>
            </Link>
        </Paper>
    );
}

export default function BlogCarousel({ currentBlogId }: BlogCarouselProps) {
    const blogs = useSelector((state: RootState) => state.blogs.blogs);

    const [randomBlogs, setRandomBlogs] = useState(null);

    const [blogList, setBlogList] = useState(null);

    useEffect(() => {
        const fetchRandomBlogs = async () => {
            const res = await getRandomBlogs();
            setRandomBlogs(res.filter((blog) => blog._id !== currentBlogId));
        };
        fetchRandomBlogs();
    }, [currentBlogId]);

    // useEffect(() => {
    //    randomBlogs !== null && setBlogList(randomBlogs.filter((blog) => blog._id !== currentBlogId));
    // }, [currentBlogId, randomBlogs]);

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    if (randomBlogs === null) {
        return <p>Loading...</p>;
    }

    const slides = randomBlogs
        .filter((blog) => blog.type === 'blog')
        .map((blog) => (
            <Carousel.Slide key={blog.title}>
                <Card blog={blog} />
            </Carousel.Slide>
        ));

    return (
        <Carousel
            slideSize={{ base: '100%', sm: '50%' }}
            slideGap={{ base: rem(2), sm: 'xl' }}
            align="start"
            slidesToScroll={mobile ? 1 : 2}
        >
            {slides}
        </Carousel>
    );
}
