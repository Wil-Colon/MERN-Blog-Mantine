import './homePageBlogContainer.scss';
import { Center, Grid, Loader } from '@mantine/core';
import { Link } from 'react-router-dom';
import BlogCard from '../BlogCard/BlogCard';
import ThoughtCard from '../ThoughtCard/ThoughtCard';

interface HomePageBlogContainerProps {
    blogs: any;
    setSelectedThought: any;
}

export default function HomePageBlogContainer({
    blogs,
    setSelectedThought,
}: HomePageBlogContainerProps) {
    const isEven = (number: number) => number % 2;

    return blogs !== null ? (
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
                                              ? blog?.title
                                                    .replace(/ /g, '-')
                                                    .replace(/[.,!?;]/g, '')
                                              : null
                                      }`}
                                      state={blog}
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
    ) : (
        <div className="body-container">
            <Center h={200}>
                <Loader size={30} />
            </Center>
        </div>
    );
}
