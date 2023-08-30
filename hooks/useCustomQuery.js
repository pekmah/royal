/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery} from "react-query";
import {useEffect} from "react";
import {PrivateAxiosUtility} from "@/services/AxiosUtility";
import useError from "./useError";

const useCustomQuery = (route, isEnabled) => {
  const handleError = useError();
  const { isLoading, error, data, isError, refetch } = useQuery(
    route,
    () => PrivateAxiosUtility.get(route),
    { enabled: isEnabled },
  );

  useEffect(() => {
    if (isError) {
      handleError(error);
    }
  }, [isError]);

  return { isLoading, data, refetch };
};

export default useCustomQuery;
