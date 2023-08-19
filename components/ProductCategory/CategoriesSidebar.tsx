"use client";

import getAllProductCategories from "@/services/ProductCategory/getAllProductCategories";
import { ProductCategoryEntity } from "@/types/product_category/ProductCategory";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "react-query";

export default function CategoriesSidebar() {
  const { data, isLoading } = useQuery(["categories"], () =>
    getAllProductCategories()
  );
  const categoryParam = useSearchParams().get("category");
  const maxPrice = useSearchParams().get("maxPrice");
  const minPrice = useSearchParams().get("minPrice");
  const category = categoryParam ? parseInt(categoryParam) : undefined;

  return (
    <div className="text-sm w-full mb-4">
      {isLoading && !data
        ? Array(8)
            .fill(0)
            .map((v, idx) => (
              <div
                key={idx}
                className={"w-full my-4 h-6 bg-grey animate-pulse"}
              />
            ))
        : null}
      {data && data.results ? (
        [{ id: -1, name: "All" } as ProductCategoryEntity, ...data.results].map(
          ({ id, name, thumbnail_code }) => (
            <Link
              href={`${
                id === -1
                  ? `/products${
                      maxPrice && minPrice
                        ? `?maxPrice=${maxPrice}&minPrice=${minPrice}`
                        : ""
                    }`
                  : `/products?category=${id}${
                      maxPrice && minPrice
                        ? `&maxPrice=${maxPrice}&minPrice=${minPrice}`
                        : ""
                    }`
              }`}
              className={`w-full justify-start flex items-center gap-2 px-4 py-2 hover:bg-grey hover:text-blue ${
                !category && id === -1 ? "bg-grey text-blue font-semibold" : ""
              } ${category === id ? "bg-grey text-blue font-semibold" : ""}`}
              key={id}
            >
              {thumbnail_code ? (
                <span>
                  <Image
                    src={`${process.env.BASE_URL}/api/v1/core/category/thumbnails/${thumbnail_code}`}
                    width={24}
                    height={24}
                    alt={`Thumbnail for ${name} category.`}
                  />
                </span>
              ) : null}
              {name}
            </Link>
          )
        )
      ) : !isLoading && !data ? (
        <p className="text-sm">Failed to load categories</p>
      ) : null}
    </div>
  );
}
