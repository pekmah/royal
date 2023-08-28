import { PrivateAxiosUtility } from "./AxiosUtility";

const saveCheckoutLocation = async (data) => {
  const { data: res } = await PrivateAxiosUtility.post(
    "/api/v1/cart/order/locations/set/",
    data,
  );

  return res;
};

const CheckoutServices = { saveCheckoutLocation };
export default CheckoutServices;
