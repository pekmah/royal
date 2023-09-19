"use client";

import { useQuery, useQueryClient } from "react-query";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { usePathname, useSearchParams } from "next/navigation";
import CircleLoader from "../Loaders/CircleLoader";
import Breadcrumb from "../BreadCrumb";
import { useSearchContext } from "@/context/SearchContext";
import useAuth from "@/hooks/useAuth";
import axios from "axios";

export default function ProductGrid() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(500);
  const [count, setCount] = useState(0);
  // const [searchCount, setSearchCount] = useState(0)

  const { searchQuery, searchCount, Search } = useSearchContext();
  const { search } = useAuth();

  const categoryParam = useSearchParams().get("category");
  const maxPriceParam = useSearchParams().get("maxPrice");
  const minPriceParam = useSearchParams().get("minPrice");
  const category = categoryParam ? parseInt(categoryParam) : undefined;
  const maxPrice = maxPriceParam ? parseInt(maxPriceParam) : undefined;
  const minPrice = minPriceParam ? parseInt(minPriceParam) : undefined;

  const [selectedMinPrice, setSelectedMinPrice] = useState(minPrice);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(maxPrice);

  const pathname = usePathname();

  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery(
    ["products", pageSize, page, category, minPrice, maxPrice],
    async () =>
      axios.get(
        `${process.env.BASE_URL}/api/v1/core/products/${
          category ? `category/${category}` : ""
        }?page_size=${pageSize}&page=${page}${
          minPrice ? `&minPrice=${minPrice}` : ""
        }${maxPrice ? `&maxPrice=${maxPrice}` : ""}`,
      ),

    {
      keepPreviousData: true,
      onSuccess(data) {
        setCount(data?.data?.count);
      },
      onError(err) {
        console.error("err", err);
      },
    },
  );

  useEffect(() => {
    setSelectedMinPrice(minPrice);
    setSelectedMaxPrice(maxPrice);
  }, [minPrice, maxPrice]);

  const [filteredProductCount, setFilteredProductCount] = useState(null);

  // ...

  useEffect(() => {
    if (data?.data?.results) {
      const count = data.data?.results.filter(
        (product) =>
          !selectedMinPrice ||
          !selectedMaxPrice ||
          (product.pricing &&
            product.pricing[0]?.price >= selectedMinPrice &&
            product.pricing[0]?.price <= selectedMaxPrice),
      ).length;
      setFilteredProductCount(count);
    }
  }, [data, selectedMinPrice, selectedMaxPrice]);

  // useEffect(() => {
  //   if (data?.data?.next) {
  //     queryClient.prefetchQuery(["products", page + 1], () =>
  //       queryFn(pageSize, page + 1),
  //     );
  //   }
  // }, [data, page, queryClient, pageSize, queryFn]);

  // @ts-ignore
  return (
    <div className="w-full">
      {pathname.startsWith("/products") ? (
        <div className="w-full min-h-[30px] items-center flex justify-between">
          <Breadcrumb />
          {isFetching ? <CircleLoader /> : null}
        </div>
      ) : null}

      <div className={"relative"}>
        {data?.data?.results ? (
          <div className="mt-5 font-barlow font-[600] text-xl z-10">{`Products (${
            searchQuery ? searchCount : filteredProductCount
          })`}</div>
        ) : null}
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-[#fbfbff] mt-6">
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, idx) => <ProductCardSkeleton key={idx} />)
          : searchQuery && Search
          ? Search.filter(
              (product) =>
                !selectedMinPrice ||
                !selectedMaxPrice ||
                (product.pricing &&
                  product.pricing[0]?.price >= selectedMinPrice &&
                  product.pricing[0]?.price <= selectedMaxPrice),
            ).map((product, idx) => (
              <ProductCard key={`${product.id}_${idx}`} product={product} />
            ))
          : data && data.data?.results
          ? data.data?.results
              .filter(
                (product) =>
                  !selectedMinPrice ||
                  !selectedMaxPrice ||
                  (product.pricing &&
                    product.pricing[0]?.price >= selectedMinPrice &&
                    product.pricing[0]?.price <= selectedMaxPrice),
              )
              .map((product, idx) => (
                <ProductCard key={`${product.id}_${idx}`} product={product} />
              ))
          : null}
      </div>

      {data?.data?.results ? (
        <div className="w-full flex justify-center py-8">
          <Pagination
            currentPage={page}
            onPageChange={setPage}
            count={searchQuery ? searchCount : count}
            pageSize={pageSize}
            itemCount={
              searchQuery &&
              (Search ? Search.length : filteredProductCount || 0)
            }
          />
        </div>
      ) : null}
    </div>
  );
}
