import { AxiosUtility } from "./AxiosUtility";

const login = async (data) => {
  const { data: res } = await AxiosUtility.post(
    "/api/v1/auth/user/login/",
    data,
  );

  return res;
};

const signUp = async (data) => {
  const { data: res } = await AxiosUtility.post(
    "/api/v1/auth/user/register/",
    data,
  );

  return res;
};

const AuthServices = { login, signUp };
export default AuthServices;
