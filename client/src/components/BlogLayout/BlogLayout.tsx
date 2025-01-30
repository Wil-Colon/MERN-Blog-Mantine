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
import { getRandomBlogs, getSingleBlogById } from '../../redux/actions/blog';
import { RootState } from '../../redux/rootReducer';
import BlogCarousel from '../BlogCarousel/BlogCarousel';
import AddComment, { UserComment } from '../AddComment/AddComment';
import axios from 'axios';

export default function BlogLayout() {
    const location = useLocation();
    const dispatch = useDispatch();
    const state = location.state;
    const user = useSelector((state: RootState) => state.user.currentUser);
    const blogs = useSelector((state: RootState) => state.blogs);
    const blogId = location.pathname.replace(/\/blogs\/|-.*/g, '');
    const [currentBlog, setCurrentBlog] = useState(null);

    useEffect(() => {
        const getBlog = async () => {
            const res = await axios.get(
                `http://localhost:3000/api/blog/${blogId}`
            );
            setCurrentBlog(res.data);
            dispatch(getSingleBlogById(blogId));
        };
        getBlog();
    }, [state]);

    if (currentBlog === null) {
        return <Loader />;
    }

    return (
        <BodyContainer fluid={false} size="lg" pb={80}>
            <Flex
                mih={50}
                mt={50}
                gap="md"
                justify="flex-start"
                direction="column"
                wrap="wrap"
            >
                <Title fw={400}>{currentBlog.title}</Title>
                <small style={{ marginTop: '-1rem' }}>
                    {moment(currentBlog.date, moment.ISO_8601).format(
                        'YYYY-MM-DD'
                    )}
                </small>
                <Carousel mb={10} withIndicators height="100%">
                    <Carousel.Slide>
                        <Image className="image" src={currentBlog.coverPhoto} />
                    </Carousel.Slide>
                    {currentBlog.galleryPhotos.map((photo, i) => (
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
                        <Text>{currentBlog.body}</Text>
                        {user ? (
                            <LikeButton selectedThought={currentBlog} />
                        ) : (
                            <LikeButtonsNonUser selectedThought={currentBlog} />
                        )}
                    </Flex>
                    <Flex className="blogcontainer__avatar">
                        <Avatar
                            src={currentBlog.avatar}
                            alt="it's me"
                            className="blogcontainer__avatar--photo image"
                        />
                        <Text className="blogcontainer__avatar--name">
                            {currentBlog.userName}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <AddComment currentBlogId={currentBlog._id} />
            {currentBlog.comments.length <= 0 ? (
                <p>No comments</p>
            ) : (
                currentBlog.comments.map((blog, i) => (
                    <UserComment
                        key={blog._id}
                        commentData={blog}
                        currentBlogId={currentBlog._id} //what blog does the comment belong to.
                        commentOwnerUserId={blog.userId}
                    />
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

            <BlogCarousel currentBlogId={currentBlog._id} />
        </BodyContainer>
    );
}
