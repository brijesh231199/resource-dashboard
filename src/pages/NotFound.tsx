import { Link } from "react-router-dom";
import { Center, Container, Title, Button } from "@mantine/core";

const NotFound = () => {
  return (
    <Container>
      <Center style={{ height: "100vh", flexDirection: "column" }}>
        <Title order={2}>404 - Page Not Found</Title>
        <Button component={Link} to="/login" mt="md">
          Go to Login
        </Button>
      </Center>
    </Container>
  );
};

export default NotFound;
