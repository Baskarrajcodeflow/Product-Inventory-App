import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorHandlingComponent = () => {
  toast.error("Network Error. Please check your internet connection.");
  return null;
};

export default ErrorHandlingComponent;
