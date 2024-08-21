import './homePageBlogContainer.scss';
import img2 from '../../assets/images/filler2.png';
import { Grid } from '@mantine/core';
import BlogCard from '../BlogCard/BlogCard';
import ThoughtCard from '../ThoughtCard/ThoughtCard';
import BodyContainer from '../BodyContainer/BodyContainer';

export default function HomePageBlogContainer() {
    return (
        <div className="body-container">
            <Grid justify="center" grow>
                {/* blogs.map, if not a 'thought' then blog.length number even then short card, if odd then long card. if thought is true then always set width */}
                <Grid.Col
                    span={{ base: 11, md: 6, lg: 3 }}
                    className="body-container__column"
                >
                    {/* link to /blogs/id */}
                    <BlogCard id={'derrr'} />
                </Grid.Col>

                <Grid.Col
                    span={{ base: 11, md: 6, lg: 5 }}
                    className="body-container__column"
                >
                    <BlogCard id={'derrsad'} />
                </Grid.Col>

                <Grid.Col
                    span={{ base: 11, md: 11, lg: 3 }}
                    className="body-container__column"
                >
                    <ThoughtCard id={'dsadaad'} />
                </Grid.Col>
            </Grid>
        </div>
    );
}
