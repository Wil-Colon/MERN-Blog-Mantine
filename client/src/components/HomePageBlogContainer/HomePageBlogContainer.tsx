import './homePageBlogContainer.scss';
import { Center, Grid, Loader } from '@mantine/core';
import { Link } from 'react-router-dom';
import BlogCard from '../BlogCard/BlogCard';
import ThoughtCard from '../ThoughtCard/ThoughtCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../../redux/actions/blog';
import BodyContainer from '../BodyContainer/BodyContainer';

interface HomePageBlogContainerProps {
    setSelectedThought: any;
}

export default function HomePageBlogContainer({
    setSelectedThought,
}: HomePageBlogContainerProps) {
    const isEven = (number: number) => number % 2;
    const dispatch = useDispatch();
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        dispatch(getAllBlogs());
    }, []);

    useEffect(() => {
        if (blogs !== null) {
            if (blogs.length > 1) {
                setIsLoading(false);
            }
        }
    }, [blogs]);

    console.log(isLoading);

    if (isLoading === true || blogs === null) {
        return (
            <BodyContainer size={'xl'} fluid={false} pb={50}>
                <Loader />
            </BodyContainer>
        );
    }

    return (
        <div className="body-container">
            <Grid justify="center" grow>
                {blogs.map((blog, i) =>
                    blog.type === 'blog'
                        ? i < 6 && (
                              <Grid.Col
                                  key={i}
                                  span={
                                      isEven(i)
                                          ? { base: 11, md: 6, lg: 5 }
                                          : { base: 11, md: 6, lg: 3 }
                                  }
                                  className="body-container__column"
                              >
                                  <Link
                                      to={`/blogs/${
                                          blog !== null
                                              ? `${blog._id}-${blog?.title
                                                    .replace(/ /g, '-')
                                                    .replace(/[.,!?;]/g, '')}`
                                              : null
                                      }`}
                                      //   state={blog}
                                  >
                                      <BlogCard blogData={blog} />
                                  </Link>
                              </Grid.Col>
                          )
                        : i < 6 && (
                              <Grid.Col
                                  key={i}
                                  span={{ base: 11, md: 11, lg: 3 }}
                                  className="body-container__column"
                                  onClick={() => setSelectedThought(blog)}
                              >
                                  <ThoughtCard blogData={blog} />
                              </Grid.Col>
                          )
                )}
            </Grid>
        </div>
    );
}
