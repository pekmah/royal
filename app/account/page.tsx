"use client";
// import getUserDetails from '@/services/User/getUserDetaill';
import { useSession } from "next-auth/react";
import { Barlow } from "next/font/google";
import Link from "next/link";
import { BiSolidEditAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { UserEntity } from "@/types/user/User";
import { useRouter } from "next/navigation";
import { ProductCardSkeleton } from "@/components/Product/ProductCard";

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

const Account = () => {
  // const {data} = useQuery(['user_details'], ()=> getUserDetails())
  const router = useRouter();
  const { getUser } = useAuth();
  const [data, setData] = useState<UserEntity | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status } = useSession();
  const accessToken = session?.user;

  // if (status === 'unauthenticated'){
  //   router.push('/')
  // }
  // console.log(accessToken)
  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      if (accessToken) {
        const userData = await getUser();
        setData(userData);
      }
    };
    setIsLoading(false);
    fetchUser();
  }, [accessToken]);

  return (
    <div className="bg-white">
      <div className={"py-3 px-2 border-b border-zinc-200 text-lg"}>
        <h3 className={"text-black font-barlow font-[600]"}>Profile</h3>
      </div>

      <div className={"py-3 px-1.5 "}>
        {/*header(profile section*/}
        <div className={"border border-zinc-100 rounded"}>
          <div className="flex justify-between w-full px-3 pr-8 py-3 font-barlow border-b border-zinc-100">
            <h3 className={`font-[600] text-base`}>Personal Details</h3>
            <Link
              href={"/account/edit"}
              className="flex gap-2 text-primary_red items-center"
            >
              <BiSolidEditAlt className="" size={22} />
              <span className="text-sm md:text-base font-barlow font-[500]">
                Edit
              </span>
            </Link>
          </div>

          {isLoading ? (
            <ProductCardSkeleton />
          ) : (
            <div className={` py-2 px-3`}>
              <div className="flex flex-col py-2.5 text-sm">
                <h4 className={`font-barlow font-[600] mb-2 text-base `}>
                  Name:
                </h4>
                <div className=" text-lightgrey">
                  <span>{data?.first_name}</span>
                  <span className="px-2">{data?.last_name}</span>
                </div>
              </div>

              <div className="flex flex-col py-2.5 text-sm ">
                <h4 className={`font-barlow font-[600] mb-2 text-base `}>
                  Email:
                </h4>
                <div className=" text-lightgrey">
                  <p className="text-lightgrey">{data?.email}</p>
                </div>
              </div>

              <div className="flex flex-col py-2.5 text-sm mt-2">
                <h4 className={`font-barlow font-[600] mb-2 text-base `}>
                  Phone Number:
                </h4>
                <div className=" text-lightgrey">
                  <p className="text-lightgrey">{data?.phone_number}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border border-zinc-100 rounded mt-5">
          <div className={"px-3 py-3  border-b border-zinc-100"}>
            <h3 className={`${barlowSemi.className}`}>Privacy & Security</h3>
          </div>

          <div className="flex justify-between w-full items-center px-3 pb-4 py-2 ">
            <h3 className={"font-barlow font-[500]"}>Your Password</h3>
            <Link
              href={"/account/change-password"}
              className="border text-[13px] font-barlow font-[500] md:text-base border-primary_red rounded-md  text-primary_red bg-white px-2 max-w-max py-2.5"
            >
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
