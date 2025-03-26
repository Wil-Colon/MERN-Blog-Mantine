import './homePageBlogContainer.scss';
import BlogCard from '../BlogCard/BlogCard';
import BodyContainer from '../BodyContainer/BodyContainer';
import ThoughtCard from '../ThoughtCard/ThoughtCard';
import { Grid, Loader } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../../redux/actions/blog';

interface HomePageBlogContainerProps {
    setSelectedThought: any;
}

export default function HomePageBlogContainer({
    setSelectedThought,
}: HomePageBlogContainerProps) {
    const isEven = (number: number) => number % 2;
    const dispatch = useDispatch();
    const blogs = useSelector((state: RootState) => state.blogs.blogs);

    useEffect(() => {
        dispatch(getAllBlogs());
    }, [dispatch]);

    if (blogs === null || blogs.length < 1) {
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
