import { useCustomToast } from "./useToast";

const useError = () => {
  const { showErrorToast } = useCustomToast();
  return (e) => {
    console.log("ERROR: ", JSON.stringify(e?.response));
    if (e?.response?.data) {
      if (e?.response?.data?.message) {
        return showErrorToast(
          `Request not successful. ${e?.response?.data?.message}`,
          "error",
        );
      }
      const response = e.response.data;
      const errors = response[Object.keys(response)[0]];
      if (errors?.length > 0 && errors !== "<") {
        if (Array?.isArray(errors)) {
          errors.map((err) => showErrorToast(`${err}`, "error"));
        } else {
          showErrorToast(`Request not successful. ${errors}`, "error");
        }
      } else {
        showErrorToast(` ${e?.message}`, "error");
      }
    } else {
      showErrorToast(`${e?.message}`, "error");
    }
  };
};

export default useError;
