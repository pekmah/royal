import { toast } from "react-hot-toast";

export const useCustomToast = () => {
  const showSuccessToast = (message) => toast.success(message);
  const showErrorToast = (message) => toast.error(message);

  return { showSuccessToast, showErrorToast };
};
