import { PrivateAxiosUtility } from "./AxiosUtility";

const saveCart = async (data) => {
  const { data: res } = await PrivateAxiosUtility.post(
    "/api/v1/cart/create/",
    data,
  );

  return res;
};

const createOrder = async (data) => {
  const { data: res } = await PrivateAxiosUtility.post(
    "/api/v1/cart/order/add/",
    data,
  );

  return res;
};

const makePayment = async (data) => {
  const { data: res } = await PrivateAxiosUtility.post(
    "/api/v1/cart/initiate-payment/",
    data,
  );

  return res;
};

const CartServices = { saveCart, createOrder, makePayment };
export default CartServices;
