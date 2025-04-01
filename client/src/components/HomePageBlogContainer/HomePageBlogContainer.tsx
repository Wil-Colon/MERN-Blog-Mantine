import './homePageBlogContainer.scss';
import BlogCard from '../BlogCard/BlogCard';
import ThoughtCard from '../ThoughtCard/ThoughtCard';
import { Grid } from '@mantine/core';
import { Link } from 'react-router-dom';

interface HomePageBlogContainerProps {
    setSelectedThought: any;
    blogs: any;
}

export default function HomePageBlogContainer({
    setSelectedThought,
    blogs,
}: HomePageBlogContainerProps) {
    const isEven = (number: number) => number % 2;

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
