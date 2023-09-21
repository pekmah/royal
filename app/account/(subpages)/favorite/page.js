"use client";

import React from "react";
import useCustomQuery from "../../../../hooks/useCustomQuery";
import { Paths } from "../../../../services/AxiosUtility";
import FloatingLoader from "../../../../components/FloatingLoader";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import productServices from "../../../../services/ProductServices";
import { useCustomToast } from "../../../../hooks/useToast";

const Page = () => {
  const { isLoading, data: res, refetch } = useCustomQuery(Paths.favoritesUrl);
  const router = useRouter();
  const { showSuccessToast } = useCustomToast();

  const removeFromFavoriteMutation = useMutation(
    (id) => productServices.removeFromFavorites(id),
    {
      onSuccess: async () => {
        showSuccessToast("Product removed from favorites");
        await refetch();
      },
    },
  );

  const handleRemove = (id) => {
    if (
      window.confirm("Are you sure you want to remove item from favorites?")
    ) {
      removeFromFavoriteMutation.mutate(id);
    }
  };

  return (
    <div className={"relative h-screen w-full"}>
      <div className={"px-5 p-3.5 flex gap-x-6 border-b border-gray-300 "}>
        <h5 className={"text-xl font-semibold"}>
          Favorites({res?.data?.results?.length})
        </h5>
      </div>

      <div className={"mt-3 gap-y-3 py-2 px-3 flex flex-col"}>
        {res?.data?.results?.map((order) => {
          let currentProduct = order?.product?.pricing?.at(0);

          return (
            <div
              key={order?.id}
              className={
                "border border-slate-200 py-2 px-3 flex flex-col md:flex-row gap-x-5 rounded-md"
              }
            >
              <img
                src={order?.product?.thumbnails?.at(0)?.image}
                alt={order?.image}
                className={"h-40 w-56 rounded-md hidden md:block"}
              />

              <div className={"flex flex-col gap-y-3 flex-1"}>
                <h5 className={"font-semibold"}>{order?.product?.name}</h5>

                <h5 className={"font-medium text-gray-800"}>
                  Kshs.
                  {currentProduct?.price}
                </h5>
              </div>

              <div className={"self-end flex justify-end gap-3"}>
                <button
                  onClick={() =>
                    router?.push("/products/" + order?.product?.id)
                  }
                  className="w-[150px] h-11 p-2.5 rounded bg-red-600 justify-center items-center gap-2.5 inline-flex"
                >
                  <div className="text-white text-sm font-[600]">View</div>
                </button>

                <button
                  onClick={() => handleRemove(order?.id)}
                  className="w-[150px] h-11 p-2.5 rounded border border-red-600 justify-center items-center gap-2.5 inline-flex"
                >
                  <div className="text-red-600 text-sm font-[600]">Remove</div>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {(isLoading || removeFromFavoriteMutation.isLoading) && (
        <FloatingLoader
          message={
            removeFromFavoriteMutation?.isLoading
              ? "Removing from favorites . . ."
              : "Loading favorites . . ."
          }
        />
      )}
    </div>
  );
};

export default Page;
