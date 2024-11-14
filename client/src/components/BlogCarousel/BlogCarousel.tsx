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

interface CardProps {
    title: string;
    type: string;

    coverPhoto: string;
    _id: any;
}

interface BlogCarouselProps {
    currentBlogId: string;
}

function Card({ coverPhoto, title, type, _id }: CardProps) {
    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            style={{ backgroundImage: `url(${coverPhoto})` }}
            className={classes.card}
        >
            <div>
                <Text className={classes.category} size="xs">
                    {type}
                </Text>
                <Title order={3} className={classes.title}>
                    {title}
                </Title>
            </div>

            <Link to={`/blogs/${_id}`}>
                <Button variant="white" color="dark">
                    Read article
                </Button>
            </Link>
        </Paper>
    );
}

export default function BlogCarousel({ currentBlogId }: BlogCarouselProps) {
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
    const [blogList, setBlogList] = useState(
        blogs.filter((blog) => blog._id !== currentBlogId)
    );

    useEffect(() => {
        setBlogList(blogs.filter((blog) => blog._id !== currentBlogId));
    }, [currentBlogId]);

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const slides = blogList
        .filter((blog) => blog.type === 'blog')
        .map((blog) => (
            <Carousel.Slide key={blog.title}>
                <Card {...blog} />
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
