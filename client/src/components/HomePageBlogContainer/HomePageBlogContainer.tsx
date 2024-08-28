import './homePageBlogContainer.scss';
import { Center, Grid, Loader } from '@mantine/core';
import BlogCard from '../BlogCard/BlogCard';
import ThoughtCard from '../ThoughtCard/ThoughtCard';
import { getAllBlogs } from '../../redux/actions/blog';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';

export default function HomePageBlogContainer() {
    const dispatch = useDispatch();
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
    const isEven = (number: number) => number % 2;

    useEffect(() => {
        dispatch(getAllBlogs());
    }, [dispatch]);

    return blogs !== null ? (
        <div className="body-container">
            <Grid justify="center" grow>
                {blogs.map((blog, i) =>
                    blog.type === 'blog' ? (
                        <Grid.Col
                            span={
                                isEven(i)
                                    ? { base: 11, md: 6, lg: 5 }
                                    : { base: 11, md: 6, lg: 3 }
                            }
                            className="body-container__column"
                        >
                            {/* link to /blogs/id */}
                            <BlogCard blogData={blog} />
                        </Grid.Col>
                    ) : (
                        <Grid.Col
                            span={{ base: 11, md: 11, lg: 3 }}
                            className="body-container__column"
                        >
                            <ThoughtCard blogData={blog} />
                        </Grid.Col>
                    )
                )}
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
