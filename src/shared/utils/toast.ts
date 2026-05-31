import { toast } from "react-toastify";

export const showSuccess = (message: string, options?: any) => {
  toast.success(message, options);
};

export const showError = (message: string, options?: any) => {
  toast.error(message, options);
};

export const showWarning = (message: string, options?: any) => {
  toast.warning(message, options);
};

export const showInfo = (message: string, options?: any) => {
  toast.info(message, options);
};