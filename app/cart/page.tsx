"use client";
import CartItem from "@/components/CartItem.js";
import { useCartContext } from "@/context/CartContext";
import React, { useContext, useEffect, useMemo } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { Barlow } from "next/font/google";
import { useRouter } from "next/navigation";
import AsyncStorageService from "@/services/AsyncStorageService";
import { CContext } from "@/context/CartContext2.js";
import Image from "next/image";
import empty from "@/public/empty.png";
import { useCustomToast } from "@/hooks/useToast";
import { useMutation } from "react-query";
import cartServices from "@/services/CartServices";
import useError from "@/hooks/useError";
import { Spinner } from "@/components/FloatingLoader";

const barlowSemi = Barlow({
  style: "normal",
  weight: "600",
  subsets: ["latin"],
});
const barlowMedium = Barlow({
  style: "normal",
  weight: "500",
  subsets: ["latin"],
});
const barlowNormal = Barlow({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
});

const Cart = () => {
  // @ts-ignore
  const { checkout, setCheckout } = useContext(CContext);
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const handleError = useError();

  const { itemQuantity, totalPrice } = useCartContext();
  // @ts-ignore
  const { cart } = useContext(CContext);
  const router = useRouter();

  useEffect(() => {
    const handleCart = async () => {
      await AsyncStorageService.setData("_cart", cart);
    };

    handleCart();
  }, [cart]);

  const subTotal = useMemo(() => {
    return cart?.reduce(
      (
        acc: number,
        val: {
          product: { pricing: any[] };
          pricing: any;
          measurements: { length: string };
          quantity: number;
        },
      ) => {
        const currentPricing = val?.product?.pricing
          ?.filter((prod) => prod?.id === val?.pricing)
          ?.at(0);

        // Extract the relevant numeric values from val
        const quantity = val?.quantity;
        const length = parseFloat(val?.measurements?.length) || 0;
        const price = parseFloat(currentPricing?.price) || 0;

        // Calculate single item amount based on pricing and properties
        const singleItemAmount = currentPricing?.gauge_size
          ? price * length * quantity
          : price * quantity;

        // Accumulate the single item amount in the accumulator
        return acc + singleItemAmount;
      },
      0,
    );
  }, [cart]);

  const vat = (Math.ceil(parseInt(subTotal)) * 16) / 100;
  const total = subTotal + vat;

  // @ts-ignore
  const mutation = useMutation(
    (data) => cartServices.saveCart({ items: data }),
    {
      onSuccess: (res) => {
        showSuccessToast("Cart Saved.");

        // @ts-ignore
        setCheckout((prev) => ({
          ...prev,
          cartId: res?.items?.id,
          isCheckingOut: true,
        }));

        router.push("/checkout/address");
      },
      onError: (e) => handleError(e),
    },
  );

  const handleProceedToCheckout = async () => {
    if (cart?.length < 1) {
      return showErrorToast("Cart empty!");
    }
    // @ts-ignore
    let newItemsArr = [];
    // @ts-ignore
    cart?.forEach((item) => {
      let newCartItem = {
        pricing: item?.pricing,
        length: parseFloat(item?.measurements?.length),
        color: item?.product?.thumbnails?.at(item?.color)?.thumbnail_color,
        quantity: parseInt(item?.quantity),
      };

      newItemsArr?.push(newCartItem);
    });

    // if (checkout?.isEditing && checkout?.editScreen === "cart") {
    //   updateCartProduct(checkout?.cartId, {
    //     items: newItemsArr,
    //   }).then(async (r) => {
    //     showToast("Cart updated.");
    //     navigation.navigate("checkout_confirmorder");
    //     resetEditing();
    //   });
    // } else {
    // @ts-ignore
    mutation.mutate(newItemsArr);
  };
  return (
    <div className={"min-h-[80vh] flex"}>
      {cart?.length >= 1 ? (
        <div className="flex flex-col md:flex-row w-full justify-between gap-4 md:gap-8">
          <div className="min-w-[60%]">
            <CartItem items={cart} />
          </div>

          <div className="flex-1 md:min-w-[35%] ">
            <div className="shadow-sm w-full h-full px-3">
              <h3 className={`${barlowSemi.className} py-4 `}>Order Summary</h3>
              <div className="flex w-full justify-between">
                <span className={`${barlowNormal.className} text-black/60 `}>
                  Total for item(s)
                </span>
                <span className={`${barlowSemi.className} `}>
                  {Math.ceil(parseInt(subTotal))}
                </span>
              </div>
              <div className="flex w-full justify-between py-2">
                <span className={`${barlowNormal.className} text-black/60 `}>
                  VAT( 16% )
                </span>
                <span className={`${barlowSemi.className} `}>
                  {Math.ceil(vat)}
                </span>
              </div>

              <div className="flex w-full justify-between pt-4">
                <span className={`${barlowMedium.className} `}>Total</span>
                <span className={`${barlowSemi.className} `}>
                  {Math.ceil(parseInt(total))}
                </span>
              </div>
              <div className="flex gap-4 py-6 w-full justify-center">
                <button
                  onClick={() => router.push("/")}
                  className=" button-secondary text-[13px] md:text-base border border-primary_red py-1.5 font-bold px-4 h-10 md:h-14 "
                >
                  Back To shop
                </button>

                <button
                  className={`button-primary text-[13px] md:text-base py-1.5 flex gap-2 items-center font-[600] h-10 md:h-14 ${
                    mutation?.isLoading && "opacity-70"
                  } `}
                  // onClick={() => router.push("/checkout/address")}
                  onClick={handleProceedToCheckout}
                >
                  {!mutation?.isLoading ? (
                    <>
                      <span>Checkout</span>
                      <BsArrowRightShort size={25} />
                    </>
                  ) : (
                    <>
                      <Spinner h={"6"} w={"6"} />
                      <span> Saving cart . . .</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={"flex-1 flex flex-col gap-y-2 justify-center items-center"}
        >
          <Image src={empty} alt={"empty"} />
          <h5 className={"font-barlow font-[500] text-gray-400"}>
            Cart empty.{" "}
          </h5>
        </div>
      )}
    </div>
  );
};

export default Cart;
