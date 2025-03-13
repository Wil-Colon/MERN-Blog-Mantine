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
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
    const blogId = location.pathname.replace(/\/blogs\/|-.*/g, '');
    // const [blogs, setblogs] = useState(null);

    useEffect(() => {
        dispatch(getSingleBlogById(blogId));
        // const getBlog = async () => {
        //     const res = await axios.get(
        //         `http://localhost:3000/api/blog/${blogId}`
        //     );
        //     // setblogs(res.data);
        //     dispatch(getSingleBlogById(blogId));
        // };
        // getBlog();
    }, [state, blogId, dispatch]);

    if (blogs === null || blogs.length > 1) {
        return <Loader />;
    }

    return (
        <BodyContainer fluid={false} size="lg" pb={80}>
            <Carousel mt={30} mb={10} withIndicators height="100%">
                <Carousel.Slide>
                    <Image className="image" src={blogs[0].coverPhoto} />
                </Carousel.Slide>
                {blogs[0].galleryPhotos.map((photo, i) => (
                    <Carousel.Slide key={i}>
                        <Image src={photo}></Image>
                    </Carousel.Slide>
                ))}
            </Carousel>
            <div>
                <Title fw={400}>{blogs[0].title}</Title>
                <small style={{ marginTop: '-1rem' }}>
                    {moment(blogs[0].date, moment.ISO_8601).format(
                        'YYYY-MM-DD'
                    )}
                </small>

                <div className="blogcontainer">
                    <Flex className="blogcontainer__body">
                        <Text>{blogs[0].body}</Text>
                        {user ? (
                            <LikeButton selectedThought={blogs[0]} />
                        ) : (
                            <LikeButtonsNonUser selectedThought={blogs[0]} />
                        )}
                    </Flex>
                    <Flex className="blogcontainer__avatar">
                        <Avatar
                            src={blogs[0].avatar}
                            alt="it's me"
                            className="blogcontainer__avatar--photo image"
                        />
                        <Text className="blogcontainer__avatar--name">
                            {blogs[0].userName}
                        </Text>
                    </Flex>
                </div>
            </div>
            <AddComment currentBlogId={blogs[0]._id} />
            {blogs[0].comments.length <= 0 ? (
                <p>No comments</p>
            ) : (
                blogs[0].comments.map((blog, i) => (
                    <UserComment
                        key={blog._id}
                        commentData={blog}
                        currentBlogId={blogs[0]._id} //what blog does the comment belong to.
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

            <BlogCarousel blogsId={blogs[0]._id} />
        </BodyContainer>
    );
}
