import "./body.scss";
import { Container, Grid, SimpleGrid, Skeleton, rem } from "@mantine/core";

const PRIMARY_COL_HEIGHT = rem(300);

export default function Body() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container fluid className="body-container">
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        <div>
          {" 1"}
          <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
        </div>
        <div>
          {" 2"}
          <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
        </div>
        <div>
          {"3 "}
          <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
        </div>
      </SimpleGrid>
    </Container>
  );
}
