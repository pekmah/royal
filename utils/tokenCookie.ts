import { InternalAxiosRequestConfig } from "axios";
import cookie from "cookie";

const TOKEN_COOKIE_NAME = "accessToken";

export function setAccessToken(token: string): void {
  const cookieOptions: cookie.CookieSerializeOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 300,
  };

  document.cookie = cookie.serialize(TOKEN_COOKIE_NAME, token, cookieOptions);
}



export const getAccessToken = (req?: any): string | undefined => {
  const cookies = cookie.parse(
    req ? req.headers.cookie || '' : document.cookie
  );
  return cookies[TOKEN_COOKIE_NAME];
};
