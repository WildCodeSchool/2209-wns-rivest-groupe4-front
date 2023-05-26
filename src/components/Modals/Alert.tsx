import { useContext, useEffect } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import AlertContext from "../../contexts/AlertContext";

export default function Alert() {
  const { alertState, hideAlert } = useContext(AlertContext);

  let title = "";
  let color = "";

  if (alertState.type === "info") {
    title = "Information";
    color = "blue";
  } else if (alertState.type === "warning") {
    title = "Warning";
    color = "yellow";
  } else if (alertState.type === "error") {
    title = "Error";
    color = "red";
  } else if (alertState.type === "success") {
    title = "Success";
    color = "green";
  }

  useEffect(() => {
    if (alertState.show) {
      setTimeout(() => {
        hideAlert();
      }, 5000);
    }
  }, [alertState, hideAlert]);

  if (!alertState.show) {
    return null;
  }

  return (
    <div
      className={`rounded-md bg-${color}-50 p-4 z-50 fixed top-5 right-5 w-1/4`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {alertState.type === "info" && (
            <InformationCircleIcon
              className="h-5 w-5 text-blue-400"
              aria-hidden="true"
            />
          )}
          {alertState.type === "warning" && (
            <ExclamationTriangleIcon
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
          )}
          {alertState.type === "error" && (
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-400"
              aria-hidden="true"
            />
          )}
          {alertState.type === "success" && (
            <CheckCircleIcon
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          )}
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium text-${color}-800`}>{title}</h3>
          <div className={`mt-2 text-sm text-${color}-700`}>
            <p>{alertState.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
