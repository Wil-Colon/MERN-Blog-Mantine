import "./body.scss";

import img2 from "../../assets/images/filler2.png";
import {
  Container,
  Grid,
  Image,
  SimpleGrid,
  Skeleton,
  rem,
  Card,
  Text,
  Group,
  Button,
} from "@mantine/core";

import BlogCard from "../Blog-Card/BlogCard";
import ThoughtCard from "../ThoughtCard/ThoughtCard";

export default function Body() {
  return (
    <Container fluid className="body-container">
      <Text className="body-container__header">Get'er Done</Text>

      <Grid justify="center" grow>
        {/* blogs.map, if not a 'thought' then blog.length number even then short card, if odd then long card. if thought is true then always set width */}
        <Grid.Col
          span={{ base: 11, md: 6, lg: 3 }}
          className="body-container__column"
        >
          {/* link to /blogs/id */}
          <BlogCard id={"derrr"} />
        </Grid.Col>

        <Grid.Col
          span={{ base: 11, md: 6, lg: 5 }}
          className="body-container__column"
        >
          <BlogCard id={"derrsad"} />
        </Grid.Col>

        <Grid.Col
          span={{ base: 11, md: 11, lg: 3 }}
          className="body-container__column"
        >
          <ThoughtCard id={"dsadaad"} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
