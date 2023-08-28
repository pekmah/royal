import { toast } from "react-hot-toast";

export const useCustomToast = () => {
  const showSuccessToast = (message) =>
    toast.success(message, { position: "top-right" });
  const showErrorToast = (message) =>
    toast.error(message, { position: "top-right" });

  return { showSuccessToast, showErrorToast };
};
