import './bloglayout.scss';
import moment from 'moment';
import BodyContainer from '../BodyContainer/BodyContainer';
import LikeButton, { LikeButtonsNonUser } from '../LikeButton/LikeButton';
import { useEffect, useState } from 'react';
import { Carousel } from '@mantine/carousel';
import {
    Avatar,
    Center,
    Flex,
    Image,
    Loader,
    Text,
    Title,
} from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../../redux/actions/blog';
import { RootState } from '../../redux/rootReducer';
import BlogCarousel from '../BlogCarousel/BlogCarousel';
import AddComment, { CommentSimple } from '../AddComment/AddComment';

export default function BlogLayout() {
    const path = useLocation().pathname.slice(7);
    const dispatch = useDispatch();
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
    const user = useSelector((state: RootState) => state.user.currentUser);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        blogs === null && dispatch(getAllBlogs());

        blogs !== null &&
            setCurrentBlog(blogs.filter((blog) => blog._id === path)[0]);

        currentBlog !== null && setIsLoading(false);
    }, [dispatch, blogs, path, currentBlog]);

    const loadingContainer = (
        <BodyContainer fluid={false} size="lg">
            <Center h={800}>
                <Loader />
            </Center>
        </BodyContainer>
    );

    return isLoading ? (
        loadingContainer
    ) : (
        <BodyContainer fluid={false} size="lg" pb={80}>
            <Flex
                mih={50}
                mt={50}
                gap="md"
                justify="flex-start"
                direction="column"
                wrap="wrap"
            >
                <Title fw={400}>{currentBlog?.title}</Title>
                <small style={{ marginTop: '-1rem' }}>
                    {moment(currentBlog.date, moment.ISO_8601).format(
                        'YYYY-MM-DD'
                    )}
                </small>
                <Carousel mb={10} withIndicators height="100%">
                    <Carousel.Slide>
                        <Image
                            className="image"
                            src={currentBlog?.coverPhoto}
                        />
                    </Carousel.Slide>
                    {currentBlog?.galleryPhotos.map((photo, i) => (
                        <Carousel.Slide key={i}>
                            <Image src={photo}></Image>
                        </Carousel.Slide>
                    ))}
                </Carousel>
                <Flex
                    className="blogcontainer"
                    direction={{ base: 'column', sm: 'row' }}
                >
                    <Flex className="blogcontainer__body">
                        <Text>{currentBlog?.body}</Text>

                        {user ? (
                            <LikeButton selectedThought={currentBlog} />
                        ) : (
                            <LikeButtonsNonUser selectedThought={currentBlog} />
                        )}
                    </Flex>
                    <Flex className="blogcontainer__avatar">
                        <Avatar
                            src={currentBlog?.avatar}
                            alt="it's me"
                            className="blogcontainer__avatar--photo image"
                        />
                        <Text className="blogcontainer__avatar--name">
                            {currentBlog?.userName}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <AddComment currentBlogId={path} />
            {currentBlog.comments.length <= 0 ? (
                <p>No comments</p>
            ) : (
                currentBlog.comments.map((blog) => (
                    <CommentSimple commentData={blog} />
                ))
            )}

            <Text
                size="xl"
                fw={700}
                mt={'2rem'}
                style={{ textDecoration: 'underline' }}
            >
                Other great blogs to checkout!
            </Text>
            {blogs.length <= 1 ? (
                <p>no blogs available</p>
            ) : (
                <BlogCarousel currentBlogId={path} />
            )}
        </BodyContainer>
    );
}
