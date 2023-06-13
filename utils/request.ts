import axios, {
  RawAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from "axios";
import { getAccessToken } from "./tokenCookie";

// Set base URL for the API
axios.defaults.baseURL = process.env.BASE_URL;
axios.interceptors.response.use((response) => response, axiosErrorHandler);
axios.interceptors.request.use((config) => {
  console.log(config.headers);
  const accessToken = getAccessToken(config);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, axiosErrorHandler);

type TError = {
  status: number;
  data: any;
  message: any;
  config: AxiosRequestConfig<any> | undefined;
};

function axiosErrorHandler(error: AxiosError) {
  return new Promise((_, rej) => rej(error));
}

const defaultRequestConfig: RawAxiosRequestConfig = {
  validateStatus(status: number) {
    return status.toString().at(0) !== "5" && status.toString().at(0) !== "4";
  },
};

export const getRequest = <T>(
  path: string,
  config = defaultRequestConfig
): Promise<AxiosResponse<T, RawAxiosRequestConfig<T>>> => {
  return axios.get<T, AxiosResponse<T>, RawAxiosRequestConfig<T>>(path, {
    ...config,
  });
};

export const postRequest = <T>(
  path: string,
  data: T,
  config = defaultRequestConfig
): Promise<AxiosResponse<T, RawAxiosRequestConfig<T>>> => {
  return axios.post(path, data, { ...config });
};

export const patchRequest = <T>(
  path: string,
  data: T,
  config = defaultRequestConfig
): Promise<AxiosResponse<T, RawAxiosRequestConfig<T>>> => {
  return axios.patch(path, data, { ...config });
};

export const putRequest = <T>(
  path: string,
  data: T,
  config = defaultRequestConfig
): Promise<AxiosResponse<T, RawAxiosRequestConfig<T>>> => {
  return axios.put(path, data, { ...config });
};

export const deleteRequest = <T>(
  path: string,
  config = defaultRequestConfig
): Promise<AxiosResponse<T, RawAxiosRequestConfig<T>>> => {
  return axios.delete(path, { ...config });
};
