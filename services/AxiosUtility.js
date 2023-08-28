import axios from "axios";
import jwt_decode from "jwt-decode";
import {getSession} from "next-auth/react";
import dayjs from "dayjs";
// import dayjs from "dayjs";

export const ENDPOINT = "https://royalapis.glitexsolutions.co.ke";

export const PrivateAxiosUtility = axios.create({
  baseURL: `${ENDPOINT}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AxiosUtility = axios.create({
  baseURL: `${ENDPOINT}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

PrivateAxiosUtility.interceptors.request.use(async (req) => {
  const session = await getSession();

  let token;
  // check if access-token exists
  if (session?.user) {
    token = session.user;
    req.headers.Authorization = `Bearer ${token}`;
  } else {
    window.location.href = "/login/";
  }

  const user = jwt_decode(token);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;
  else window.location.href = "/auth/login/";
});

export const Paths = {
  countiesUrl: "/api/v1/cart/deliverycosts/?page_size=500&page=1",
  userLocationsUrl: "/api/v1/cart/order/locations/",
};
