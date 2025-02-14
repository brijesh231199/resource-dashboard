import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Button,
  Card,
  Container,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { showNotification } from "../components/Notifications";
import { useAppStore } from "../store/app.store";
import { NotificationType } from "../constants/DataConstants";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAppStore();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) => (value ? null : "Please enter username"),
      password: (value) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
          value
        )
          ? null
          : "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    if (form.isValid()) {
      if (login(values.username, values.password)) {
        showNotification({
          title: "Login Successful",
          description: "Welcome back!",
          type: NotificationType.SUCCESS,
        });
        navigate("/dashboard");
      } else {
        console.log("invalid cred");
        showNotification({
          title: "Authentication Failed",
          description: "Invalid credentials",
          type: NotificationType.ERROR,
        });
      }
    }
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        sx={{ width: "400px" }}
      >
        <Title align="center" order={2} mb="md">
          Login
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            withAsterisk
            label="Username"
            placeholder="Enter your username"
            {...form.getInputProps("username")}
            mb={20}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Enter your password"
            {...form.getInputProps("password")}
          />
          <Button type="submit" fullWidth mt={30}>
            Login
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
