import Image from "next/image";
import { useContext, useEffect, useMemo, useState } from "react";
import { Barlow } from "next/font/google";
import StarRating from "./StarRating";
import ColorSelector from "./ColorSelector";
import { AiOutlineEye } from "react-icons/ai";
import CostDisplay from "./CostDisplay";
import { BsCart2 } from "react-icons/bs";
import QuantityCount from "./QuantityCount";
import { CContext } from "@/context/CartContext2.js";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HeartSvg from "@/public/svg/Heart";
import { useMutation } from "react-query";
import productServices from "@/services/ProductServices";
import useError from "@/hooks/useError";
import FloatingLoader from "@/components/FloatingLoader";
import useCustomQuery from "@/hooks/useCustomQuery";
import { Paths } from "@/services/AxiosUtility";

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

export default function ProductDetailMain({ product }) {
  // const {addToCart} = useCartContext()
  const { isLoading, data: res } = useCustomQuery(Paths.favoritesUrl);
  const { status } = useSession();
  const router = useRouter();
  const handleError = useError();
  const { cart, setCart, favorites, setFavorites } = useContext(CContext);
  const {
    id,
    name,
    thumbnails,
    thumbnail_colors,
    pricing,
    length,
    review_summary,
    total_reviews,
    roof_details_colors,
    roof_details,
  } = product;

  // console.log(product)
  const [activeFinish, setActiveFinish] = useState(null);
  const [selectedColor, setSelectedColor] = useState(
    thumbnail_colors ? thumbnail_colors[0] : undefined,
  );

  const [activeGauge, setActiveGauge] = useState(null);
  const [activeWidth, setActiveWidth] = useState(null);
  const [activeLength, setActiveLength] = useState(null);
  const [activeMeasurement, setActiveMeasurement] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "scroll";
  }, [showModal]);

  const isFavorite = useMemo(() => {
    return res?.data?.results?.some((item) => item?.product === parseInt(id));
  }, [product, favorites]);
  const findPricing = (gauge_size, width, finish) => {
    for (const model of pricing) {
      if (
        model?.gauge_size === gauge_size &&
        model.width === width &&
        model.finish === finish
      ) {
        return model.id;
      }
    }
    return null;
  };

  const calculatePrice = (gauge_size, width, finish, length, quantity) => {
    const pricingId = findPricing(gauge_size, width, finish);
    if (pricingId) {
      const pricingModel = pricing?.find((model) => model?.id === pricingId);
      if (pricingModel) {
        const totalPriceOfProduct = pricingModel.price * length * quantity;
        return totalPriceOfProduct;
      }
    }
    return null;
  };
  let totalPrice = useMemo(() => 0, []);

  if (
    activeGauge !== null &&
    activeWidth !== null &&
    activeFinish !== null &&
    activeLength !== null
  ) {
    totalPrice = calculatePrice(
      activeGauge || 0,
      activeWidth || "",
      activeFinish?.finish || "",
      parseFloat(activeLength) || 0,
      quantity,
    );
  }

  // checks if product is a nongauge product
  const isNoneGauge = useMemo(() => {
    return pricing?.length === 1 && !pricing?.at(0)?.gauge_size;
  }, [pricing]);

  const isAddToCartDisabled =
    activeLength === null || activeGauge === null || !activeFinish?.id;
  const thumbnail =
    thumbnails && thumbnails?.length > 0
      ? thumbnails.find((t) => t.thumbnail_color === selectedColor)
          ?.thumbnail_code ?? null
      : null;

  // guage list
  const gaugeList = useMemo(() => {
    // filter gauge list
    let newGList = [];
    pricing?.map((g) => {
      //     check if newGlist contains item
      const isContained = newGList?.some((i) => i === g?.gauge_size);

      if (!isContained && g?.gauge_size) {
        newGList.push(g?.gauge_size);
      }
    });
    return newGList;
  }, [pricing]);

  const widthList = useMemo(() => {
    // filter gauge list
    let newList = [];
    pricing?.map((g) => {
      //     check if newGlist contains item
      const isContained = newList?.some((i) => i === g?.width);

      if (!isContained) {
        newList.push(g?.width);
      }
    });
    setActiveWidth(newList[0]);

    return newList;
  }, [pricing]);

  const finishList = useMemo(() => {
    let list = pricing?.filter(
      (i) => i?.gauge_size === activeGauge && i?.width === activeWidth,
    );

    // filter gauge list
    let newList = [];
    list?.map((g) => {
      //     check if newGlist contains item
      const isContained = newList?.some((i) => i?.finish === g?.finish);

      if (!isContained) {
        newList.push(g);
      }
    });

    return newList;
  }, [activeGauge, activeWidth, pricing]);

  const totalProductPrice = useMemo(() => {
    let currentCartItem = cart?.filter(
      (item) => item?.pricing === activeFinish?.id,
    )[0];

    if (gaugeList?.length === 0) {
      // if (guageList < 1) {
      return parseFloat(product?.pricing?.at(0)?.price ?? 0) * quantity ?? 0;
    } else if (activeFinish?.id && parseFloat(length) > 0) {
      return (
        parseInt(activeFinish?.price) * parseFloat(activeLength) * quantity
      );
    } else {
      return 0;
    }
  }, [
    activeFinish?.id,
    activeFinish?.price,
    activeLength,
    cart,
    gaugeList?.length,
    length,
    product?.pricing,
    quantity,
  ]);

  const handleAddToCart = () => {
    // validate form
    // handleValidateRequiredFields();
    // Check if user is authenticated
    if (status === "unauthenticated") {
      router.push("/auth/login");
      toast("Please login to continue", {});
    }

    // check if item is already contained
    let itemIsContained = false;

    if (!isNoneGauge) {
      if (cart?.some((item) => item?.pricing === activeFinish?.id)) {
        let currentCartItem = cart?.find(
          (item) => item?.pricing === activeFinish?.id,
        );

        itemIsContained = cart?.some(
          (item) => item?.pricing === currentCartItem?.pricing,
        );
      }
    } else {
      let currentCartItem = cart?.find(
        (item) => item?.pricing === pricing?.at(0)?.id,
      );

      if (currentCartItem) {
        itemIsContained = cart?.some(
          (item) => item?.pricing === currentCartItem?.pricing,
        );
      } else {
        itemIsContained = false;
      }
    }

    if (itemIsContained) {
      let currentCartItem = isNoneGauge
        ? cart?.filter((item) => item?.pricing === pricing?.at(0)?.id)[0]
        : cart?.filter((item) => item?.pricing === activeFinish?.id)[0];
      // console.log(currentCartItem);
      let OtherCartItems = isNoneGauge
        ? cart?.filter((item) => item?.pricing !== pricing?.at(0)?.id)
        : cart?.filter((item) => item?.pricing !== activeFinish?.id);

      setCart((prev) => [
        {
          quantity: (currentCartItem?.quantity ?? 0) + quantity,
          product: product,
          measurements: { length: activeLength, width: activeWidth },
          color: selectedColor,
          total_price: totalProductPrice ?? 0 + currentCartItem?.total_price,
          pricing: isNoneGauge ? pricing?.at(0)?.id : activeFinish?.id,
        },
        ...OtherCartItems,
      ]);
      toast.success("Item quantity increased");
    } else {
      //   initiate new item to cart

      setCart((prev) => [
        ...prev,
        {
          quantity,
          measurements: { length: activeLength, width: activeWidth },
          color: selectedColor,
          product: product,
          total_price: totalProductPrice,
          pricing: isNoneGauge ? pricing?.at(0)?.id : activeFinish?.id,
        },
      ]);
      toast.success("Item added to cart");
    }
  };

  const addFavoriteMutation = useMutation(
    (data) =>
      productServices?.addToFavorites({
        product: id,
      }),
    {
      onSuccess: (res) => {
        setFavorites([...favorites, res?.favorite]);
      },
      onError: (e) => handleError(e),
    },
  );
  // const { isLoading, data: res } = useCustomQuery(Paths.openOrdersUrl);
  const handleAddToFavorites = async () => {
    addFavoriteMutation.mutate();
  };
  const handleRemoveFromFavorites = async () => {
    // await removeProductFromFavorites(productId);
  };

  const handleFavorites = async () => {
    if (isFavorite) {
      await handleRemoveFromFavorites();
    } else {
      await handleAddToFavorites();
    }
  };

  return (
    <div
      className={`w-full rounded-md shadow-lg bg-white flex flex-col md:flex-row gap-6 p-4 mt-4 relative`}
    >
      <div className="w-full relative flex-1">
        <div className="relative h-[240px]">
          <button
            className={
              "cursor-pointer z-[100] rounded-full absolute top-2 right-2 flex items-center justify-center h-10 w-10 bg-[#F3F3F3]"
            }
            onClick={handleFavorites}
          >
            <HeartSvg fill={isFavorite ? "#2C3699" : "none"} />
          </button>
          <Image
            alt={"Product Thumbnail"}
            src={
              thumbnail
                ? `${process.env.BASE_URL}/api/v1/core/products/thumbnail/${thumbnail}`
                : "/temp-product-abt-3.png"
            }
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="rounded-md"
          />
          {roof_details?.length > 0 && (
            <div
              onClick={(e) => setShowModal(true)}
              className={`absolute cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue rounded-3xl bg-white/80 z-10 flex gap-2 items-center px-4 py-1.5 `}
            >
              <AiOutlineEye size={25} />
              <p className={`${barlowMedium.className}`}>View Roof</p>
            </div>
          )}
        </div>

        {product?.pricing?.at(0)?.gauge_size && (
          <div className="flex gap-10 items-center py-4 ">
            {thumbnail_colors ? (
              <div className={"flex-1"}>
                <h3 className={`text-base ${barlowSemi.className}`}>Color:</h3>
                <ColorSelector
                  colors={thumbnail_colors}
                  onSelectColor={setSelectedColor}
                />
              </div>
            ) : null}
            {pricing && pricing[0]?.finish !== null && (
              <div className={"flex-1"}>
                <label className="text-sm font-semibold mb-1">Finish:</label>
                <select
                  className={`flex-1 text-gray-500 w-full bg-white border border-gray-300 focus:outline-none py-3 px-2 rounded-lg font-barlow text-base`}
                  placeholder={"Choose Finish"}
                  onChange={(e) => {
                    // @ts-ignore
                    setActiveFinish(
                      pricing.find(
                        (item) =>
                          parseInt(item.id) === parseInt(e.target.value),
                      ),
                    );
                  }}
                >
                  <option className={`px-2 py-3 bg-white text-gray-500 `}>
                    Select
                  </option>
                  {finishList?.map((item) => (
                    <option
                      key={item?.id}
                      value={item?.id}
                      className={`px-2 py-3 bg-white text-gray-500 text-base`}
                    >
                      {item?.finish}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className={"w-full mt-4 md:mt-0 flex-1 max-h-max"}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="w-full">
          <h3 className={`text-lg ${barlowSemi.className} py-4`}>{name}</h3>
          {review_summary > 0 && total_reviews > 0 && (
            <div className="py-4">
              <StarRating
                rating={review_summary ?? 0}
                reviewCount={total_reviews ?? 0}
              />
            </div>
          )}
          {product?.pricing?.at(0)?.gauge_size && (
            <div className=" flex gap-4 items-center">
              {
                <div className={"flex-1"}>
                  <label className="text-sm font-semibold mb-1">
                    Gauge size:
                  </label>
                  <select
                    className={`flex-1 text-gray-500 w-full bg-white border border-gray-300 focus:outline-none py-3 px-2 rounded-lg font-barlow text-base`}
                    placeholder={"Choose Finish"}
                    onChange={(e) => {
                      // @ts-ignore
                      setActiveGauge(e.target.value);
                      setActiveFinish({});
                    }}
                  >
                    <option className={`px-2 py-3 bg-white text-gray-500 `}>
                      Select
                    </option>
                    {gaugeList?.map((item) => (
                      <option
                        key={item}
                        value={item}
                        className={`px-2 py-3 bg-white text-gray-500 text-base`}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              }
              {length?.length > 0 && length !== null && (
                <div className={"flex-1"}>
                  <label className="text-sm font-semibold mb-1">
                    Measurements:
                  </label>
                  <select
                    className={`flex-1 text-gray-500 w-full bg-white border border-gray-300 focus:outline-none py-3 px-2 rounded-lg font-barlow text-base`}
                    placeholder={"Choose Finish"}
                    onChange={(e) => {
                      setActiveMeasurement(e.target.value);
                      if (e.target.value?.toLocaleLowerCase() !== "custom") {
                        setActiveLength(e.target.value);
                      }
                    }}
                  >
                    <option className={`px-2 py-3 bg-white text-gray-500 `}>
                      Select
                    </option>
                    {[...length, "Custom"]?.map((item) => (
                      <option
                        key={item}
                        className={`px-2 py-3 bg-white text-gray-500 text-base`}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
          {activeMeasurement?.toLocaleLowerCase() === "custom" && (
            <div className=" flex gap-4 pt-4 items-center">
              <div className={"flex-1"}>
                <label className="text-sm font-semibold mb-1">Length:</label>

                <input
                  className={`flex-1 text-gray-500 w-full bg-white border border-gray-300 focus:outline-none py-3 px-2 rounded-lg font-barlow text-base`}
                  placeholder={"Length"}
                  onChange={(e) => setActiveLength(e.target.value)}
                ></input>
              </div>

              <div className={"flex-1"}>
                <label className="text-sm font-semibold mb-1">Width:</label>
                {/*<div*/}
                {/*    className="bg-[#FCC2C0] text-primary_red px-4 text-xs py-1 my-1 rounded-3xl">{`Default Width is !000mm, Select Custom for more`}</div>*/}
                <select
                  className={`flex-1 text-gray-500 w-full bg-white border border-gray-300 focus:outline-none py-3 px-2 rounded-lg font-barlow text-base`}
                  placeholder={"Choose Finish"}
                  value={activeWidth}
                  onChange={(e) => setActiveWidth(e.target.value)}
                >
                  <option className={`px-2 py-3 bg-white text-gray-500 `}>
                    Select
                  </option>
                  {widthList?.map((item) => (
                    <option
                      key={item}
                      className={`px-2 py-3 bg-white text-gray-500 text-base`}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <QuantityCount quantity={quantity} onQuantityChange={setQuantity} />
          <div
            className={`w-full flex flex-col sm:flex-row justify-between items-center py-4 gap-20`}
          >
            <CostDisplay
              activeSize={activeGauge}
              quantity={quantity}
              total={Math.ceil(totalProductPrice || 0)}
            />
            <button
              className="button-primary h-14 disabled:text-primary_red disabled:bg-[#FCC2C0] font-medium text-sm max-w-xs py-2 flex flex-1 items-center justify-center gap-6"
              onClick={handleAddToCart}
              disabled={
                gaugeList?.length === 0 ? quantity === 0 : isAddToCartDisabled
              }
            >
              <BsCart2 size={"20"} />

              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          roof={roof_details}
          closeModal={setShowModal}
          color={roof_details_colors}
        />
      )}

      {(addFavoriteMutation?.isLoading || isLoading) && (
        <FloatingLoader
          message={isLoading ? "Fetching favorite" : "Removing from favorite"}
        />
      )}
    </div>
  );
}
