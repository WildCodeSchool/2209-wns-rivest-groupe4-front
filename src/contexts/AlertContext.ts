import { createContext } from "react";

export type AlertType = "success" | "error" | "warning" | "info";

export interface AlertState {
  show: boolean;
  message: string;
  type: AlertType;
}

const AlertContext = createContext<{
  showAlert: (message: string, type: AlertType) => void;
  hideAlert: () => void;
  alertState: AlertState;
}>({
  showAlert: () => {},
  hideAlert: () => {},
  alertState: {
    show: false,
    message: "",
    type: "info",
  },
});

export default AlertContext;
