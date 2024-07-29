import axios from "axios";
import { toast } from "react-toastify";
const errorHandle = (error) => {

  
  if (axios.isAxiosError(error)) {
    const axiosError = error;
    if (axiosError.response?.data) {
      const errorResponse = axiosError.response.data;
      const status = axiosError.response.status;
      const accountType = errorResponse.accountType;
      
      if (status === 403 && accountType === 'user') {
        toast.error(errorResponse.message);
        if (window.location.pathname !== '/') { 
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        }
      } else if (status === 400) {
        if (accountType === 'verifiedkennelowner') {
          toast.error(errorResponse.message);
          if (window.location.pathname !== '/login') {
            setTimeout(() => {
              window.location.href = '/login';
            }, 2000);
          }
        } else {
          toast.error(errorResponse.message);
        }
      } else if (errorResponse.message) {
        toast.error(errorResponse.message);
      } else {
        console.log("Error response has no message");
        toast.error("An error occurred. Please try again!");
      }
    } else {
      console.log("axiosError", axiosError.message);
      toast.error("An error occurred. Please try again!");
    }
  } else {
    toast.error("An error occurred. Please try again!");
    console.log("Error", error.message);
  }
};

export default errorHandle;
