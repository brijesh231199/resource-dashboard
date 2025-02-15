import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Text,
  Group,
  Button,
  Grid,
  Accordion,
  Container,
  Title,
} from "@mantine/core";

import fetchData from "../api/apiClient";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Fetch user details with React Query
  const { data: user } = useQuery(["user", id], () =>
    fetchData(`https://swapi.dev/api/people/${id}/`)
  );

  // Fetch films, vehicles, and starships
  const { data: films } = useQuery(
    ["films", id],
    () => Promise.all(user?.films?.map((url: string) => fetchData(url))),
    { enabled: !!user }
  );

  const { data: vehicles } = useQuery(
    ["vehicles", id],
    () => Promise.all(user?.vehicles?.map((url: string) => fetchData(url))),
    { enabled: !!user }
  );
  const { data: starships } = useQuery(
    ["starships", id],
    () => Promise.all(user?.starships?.map((url: string) => fetchData(url))),
    { enabled: !!user }
  );
  return (
    <Container size="xl" sx={{ marginTop: "40px" }}>
      <Title align="center" order={2} mb="lg">
        User Details
      </Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Grid mt="md" ml={"md"}>
          <Grid.Col xs={12} sm={6} md={3}>
            <Text weight={600}>Name:</Text>
            <Text>{user?.name}</Text>
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={3}>
            <Text weight={600}>Height:</Text>
            <Text>{user?.height} cm</Text>
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={3}>
            <Text weight={600}>Mass:</Text>
            <Text>{user?.mass} kg</Text>
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={3}>
            <Text weight={600}>Birth Year:</Text>
            <Text>{user?.birth_year}</Text>
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={3}>
            <Text weight={600}>Gender:</Text>
            <Text>{user?.gender}</Text>
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={3}>
            <Text weight={600}>Hair Color:</Text>
            <Text>{user?.hair_color}</Text>
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={3}>
            <Text weight={600}>Eye Color:</Text>
            <Text>{user?.eye_color}</Text>
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={3}>
            <Text weight={600}>Skin Color:</Text>
            <Text>{user?.skin_color}</Text>
          </Grid.Col>
        </Grid>
        <Accordion mt="lg">
          {/* Films */}
          <Accordion.Item value="films" mb={"xl"}>
            <Accordion.Control>Films</Accordion.Control>
            <Accordion.Panel>
              {films?.length ? (
                films?.map((film) => (
                  <Card key={film.episode_id} shadow="xs" padding="sm" mt="sm">
                    <Text weight={600}>{film.title}</Text>
                    <Text size="sm">Director: {film.director}</Text>
                    <Text size="sm">Release Date: {film.release_date}</Text>
                  </Card>
                ))
              ) : (
                <Text>No films available</Text>
              )}
            </Accordion.Panel>
          </Accordion.Item>

          {/* Vehicles */}
          <Accordion.Item value="vehicles" mb={"xl"}>
            <Accordion.Control>Vehicles</Accordion.Control>
            <Accordion.Panel>
              {vehicles?.length ? (
                vehicles?.map((vehicle) => (
                  <Card key={vehicle.name} shadow="xs" padding="sm" mt="sm">
                    <Text weight={600}>{vehicle.name}</Text>
                    <Text size="sm">Model: {vehicle.model}</Text>
                    <Text size="sm">Manufacturer: {vehicle.manufacturer}</Text>
                  </Card>
                ))
              ) : (
                <Text>No vehicles available</Text>
              )}
            </Accordion.Panel>
          </Accordion.Item>

          {/* Starships */}
          <Accordion.Item value="starships" mb={"xl"}>
            <Accordion.Control>Starships</Accordion.Control>
            <Accordion.Panel>
              {starships?.length ? (
                starships?.map((starship) => (
                  <Card key={starship.name} shadow="xs" padding="sm" mt="sm">
                    <Text weight={600}>{starship.name}</Text>
                    <Text size="sm">Model: {starship.model}</Text>
                    <Text size="sm">Crew: {starship.crew}</Text>
                  </Card>
                ))
              ) : (
                <Text>No starships available</Text>
              )}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card>
      <Group position="right" my="xl">
        <Button
          variant="outline"
          color="blue"
          onClick={() => navigate("/users")}
        >
          Back to Dashboards
        </Button>
      </Group>
    </Container>
  );
};

export default UserDetails;
