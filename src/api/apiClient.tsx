import { showNotification } from "../components/Notifications";

const fetchData = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
  } catch (error: any) {
    console.error(error);
    showNotification({
      title: "API Error",
      description: error.message || "Something went wrong!",
      type: "error",
    });
  }
};

export default fetchData;
