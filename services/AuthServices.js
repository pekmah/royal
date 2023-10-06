import { AxiosUtility } from "./AxiosUtility";

const login = async (data) => {
  const { data: res } = await AxiosUtility.post(
    "/api/v1/auth/user/login/",
    data,
  );

  return res;
};

const AuthServices = { login };
export default AuthServices;
