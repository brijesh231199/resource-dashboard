import { notifications } from "@mantine/notifications";
import { NotificationType } from "../constants/DataConstants";

interface NotificationProps {
  title: string;
  description: string;
  type: "success" | "error";
}

export const showNotification = ({
  title,
  description,
  type,
}: NotificationProps) => {
  notifications.show({
    title,
    message: description,
    styles: {
      root: {
        backgroundColor:
          type === NotificationType.SUCCESS ? "#008253" : "#E0022A",
        ":before": {
          backgroundColor: "white",
        },
      },
      title: {
        color: "white",
      },
      description: {
        color: "white",
      },
      closeButton: {
        color: "white",
        ":hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  });
};
