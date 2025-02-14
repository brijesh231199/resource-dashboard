import { useIsFetching } from "@tanstack/react-query";
import { Loader } from "@mantine/core";

const LoaderOverlay = () => {
  const isFetching = useIsFetching();

  if (isFetching === 0) return null; // No active API calls

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        zIndex: 1000,
      }}
    >
      <Loader size="xl" color="blue" />
    </div>
  );
};

export default LoaderOverlay;
