import './homePageBlogContainer.scss';
import { Center, Grid, Loader } from '@mantine/core';
import img2 from '../../assets/images/filler2.png';
import BlogCard from '../BlogCard/BlogCard';
import ThoughtCard from '../ThoughtCard/ThoughtCard';
import { getAllBlogs } from '../../redux/actions/blog';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import BodyContainer from '../BodyContainer/BodyContainer';

export default function HomePageBlogContainer() {
    const dispatch = useDispatch();
    const blogs = useSelector((state: RootState) => state.blogs.blogs);

    useEffect(() => {
        dispatch(getAllBlogs());
    }, [dispatch]);

    return blogs !== null ? (
        <div className="body-container">
            <Grid justify="center" grow>
                {/* blogs.map, if not a 'thought' then blog.length number even then short card, if odd then long card. if thought is true then always set width */}
                <Grid.Col
                    span={{ base: 11, md: 6, lg: 3 }}
                    className="body-container__column"
                >
                    {/* link to /blogs/id */}
                    <BlogCard blogData={blogs} />
                </Grid.Col>

                <Grid.Col
                    span={{ base: 11, md: 6, lg: 5 }}
                    className="body-container__column"
                >
                    <BlogCard blogData={blogs} />
                </Grid.Col>

                <Grid.Col
                    span={{ base: 11, md: 11, lg: 3 }}
                    className="body-container__column"
                >
                    <ThoughtCard id={'dsadaad'} />
                </Grid.Col>
            </Grid>
        </div>
    ) : (
        <div className="body-container">
            <Center h={200}>
                <Loader size={30} />
            </Center>
        </div>
    );
}
