import { PrivateAxiosUtility } from "./AxiosUtility";

const saveCheckoutLocation = async (data) => {
  await PrivateAxiosUtility.post("/api/v1/cart/order/locations/set/", data);
};

const CheckoutServices = { saveCheckoutLocation };
export default CheckoutServices;
