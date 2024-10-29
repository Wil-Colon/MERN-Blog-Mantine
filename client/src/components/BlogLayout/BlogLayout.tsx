import './bloglayout.scss';
import {
    Avatar,
    Button,
    Flex,
    Grid,
    Image,
    Loader,
    Text,
    Title,
} from '@mantine/core';
import BodyContainer from '../BodyContainer/BodyContainer';
import { Carousel } from '@mantine/carousel';
import { Container } from '@mantine/core';
import { IconThumbDown, IconThumbUp } from '@tabler/icons-react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { useEffect, useState } from 'react';
import LikeButton, { LikeButtonsNonUser } from '../LikeButton/LikeButton';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../../redux/actions/blog';
import { RootState } from '../../redux/rootReducer';

export default function BlogLayout() {
    let { state } = useLocation();
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
    const user = useSelector((state: RootState) => state.user.currentUser);

    const [currentBlog, setCurrentBlog] = useState(state);
    const [currentBlog2, setCurrentBlog2] = useState(state);
    const [totalLikes, setTotalLikes] = useState(
        currentBlog.likes.filter((like) => like.selection === 'liked').length
    );

    useEffect(() => {
        state === null && dispatch(getAllBlogs());
    }, [blogs, dispatch]);

    useEffect(() => {
        currentBlog === null &&
            setCurrentBlog(blogs.filter((blog) => blog.id === path.slice(5)));
    }, [blogs, dispatch, state, path, currentBlog]);

    console.log(currentBlog);

    const {
        avatar,
        userName,
        body,
        comments,
        date,
        galleryPhotos,
        likes,
        title,
        type,
        coverPhoto,
    } = currentBlog;
    const dateFormat = moment(date, moment.ISO_8601).format('YYYY-MM-DD');

    const loadingContainer = (
        <BodyContainer>
            <Loader />
        </BodyContainer>
    );

    return blogs === null ? (
        loadingContainer
    ) : (
        <BodyContainer size="lg">
            <Flex
                mih={50}
                mt={50}
                gap="md"
                justify="flex-start"
                direction="column"
                wrap="wrap"
            >
                <Title mt={10} mb={10} fw={400}>
                    {title}
                </Title>
                <small>{dateFormat}</small>
                <Carousel mb={10} withIndicators height="100%">
                    <Carousel.Slide>
                        <Image src={coverPhoto}></Image>
                    </Carousel.Slide>
                    {galleryPhotos.map((photo, i) => (
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
                        <Text>{body}</Text>

                        {user ? (
                            <LikeButton selectedThought={state} />
                        ) : (
                            <LikeButtonsNonUser selectedThought={state} />
                        )}
                    </Flex>
                    <Flex className="blogcontainer__avatar">
                        <Avatar
                            src={avatar}
                            alt="it's me"
                            className="blogcontainer__avatar--photo"
                        />
                        <Text className="blogcontainer__avatar--name">
                            {userName}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </BodyContainer>
    );
}
