import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import ProtectedLayout from "./components/ProtectedLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import UserDetails from "./pages/UserDetails";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/login" replace /> },
      { path: "/login", element: <Login /> },
      {
        path: "/",
        element: <ProtectedLayout />,
        children: [
          { path: "/users", element: <Dashboard /> },
          { path: "/user/:id", element: <UserDetails /> },
          // Add more protected routes here...
        ],
      },
      { path: "*", element: <NotFound /> }, // Catch-all route for 404 pages
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: "/resource-dashboard", // Set the basename here
});

// Configure React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevent refetching when window regains focus
      retry: false, // Disable automatic retries on failure
      cacheTime: 1000 * 60 * 15, // Cache data for 15 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
