import { PrivateAxiosUtility } from "./AxiosUtility";

const addToFavorites = async (data) => {
  const { data: res } = await PrivateAxiosUtility.post(
    "/api/v1/core/favorites/add/",
    data,
  );

  return res;
};

const removeFromFavorites = async (fav_id) => {
  const { data: res } = await PrivateAxiosUtility.delete(
    "/api/v1/core/favorites/remove/" + fav_id,
  );

  return res;
};

const ProductServices = { addToFavorites, removeFromFavorites };

export default ProductServices;
