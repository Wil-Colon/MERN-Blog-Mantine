import "./body.scss";

import img1 from "../../assets/images/filler1.png";
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
  Badge,
  Button,
  ActionIcon,
} from "@mantine/core";

const PRIMARY_COL_HEIGHT = rem(200);

export default function Body() {
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  const mockdata = {
    image:
      "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    title: "Verudela Beach",
    country: "Croatia",
    description:
      "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
    badges: [
      { emoji: "☀️", label: "Sunny weather" },
      { emoji: "🦓", label: "Onsite zoo" },
      { emoji: "🌊", label: "Sea" },
      { emoji: "🌲", label: "Nature" },
      { emoji: "🤽", label: "Water sports" },
    ],
  };
  const { image, title, description, country, badges } = mockdata;

  return (
    <Container fluid className="body-container">
      <Text className="body-container__header">Get'er Done</Text>
      <Grid justify="center">
        <Grid.Col span={{ md: 6, lg: 3 }} className="body-container__column">
          <Image radius="md" h={PRIMARY_COL_HEIGHT} src={img1} />
        </Grid.Col>
        <Grid.Col span={{ md: 5, lg: 5 }} className="body-container__column">
          <Image radius="md" h={PRIMARY_COL_HEIGHT} src={img2} />
        </Grid.Col>
        <Grid.Col span={{ md: 11, lg: 3 }} className="body-container__column">
          <Card radius="md" p="md" className="body-container__card">
            <Card.Section className="section">
              <Group justify="apart" className="body-container__title">
                <Text fw={500}>{title}</Text>
              </Group>
              <Group mt="xs">
                <Button
                  radius="md"
                  size="sm"
                  className="body-container__button"
                >
                  Show details
                </Button>
              </Group>
              <Text className="body-container__text" fz="sm" mt="xs">
                {truncate(description, 145)}
              </Text>
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
