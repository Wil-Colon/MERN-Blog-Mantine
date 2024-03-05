import classes from "./hero.module.scss";

import { Overlay, Container, Title, Button, Text } from "@mantine/core";
// import classes from "./HeroContentLef.module.css";

export default function Hero() {
  return (
    <div className={classes.hero}>
      <Overlay
        className={classes.root}
        // gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>A Rhode Island Fisherman's Blog</Title>
        {/* <Text className={classes.description} size="xl" mt="xl">
          Build fully functional accessible web applications faster than ever –
          Mantine includes more than 120 customizable components and hooks to
          cover you in any situation
        </Text> */}

        <Button
          variant="trasnparent"
          size="md"
          radius="xl"
          className={classes.control}
        >
          Blogs
        </Button>
      </Container>
    </div>
  );
}
