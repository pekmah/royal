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
    window.location.href = "/auth/login/";
  }

  const user = jwt_decode(token);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;
  else window.location.href = "/auth/login/";
});

export const Paths = {
  countiesUrl: "/api/v1/cart/deliverycosts/?page_size=500&page=1",
  userLocationsUrl: "/api/v1/cart/order/locations/",
  pickupCentersUrl: "/api/v1/cart/pickupcenters/?page_size=500&page=1",
  openOrdersUrl:
    "/api/v1/auth/user/orders?order_status=NEWLY_SUBMITTED,PARTIALLY_PAID&ordering=desc&page=1&page_size=1000",
  deliveredOrdersUrl:
    "/api/v1/auth/user/orders?order_status=FULLY_PAID,FAILED,SUCCESS,ADMIN_CANCELLED&ordering=desc&page=1&page_size=1000",
  favoritesUrl: "/api/v1/core/favorites/",
};
