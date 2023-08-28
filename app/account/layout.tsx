import AccountNav from "@/components/Accounts/AccountNav";
import ProtectedRoute from "@/components/Accounts/ProtectedRoute";
import Breadcrumb from "@/components/BreadCrumb";

export const metadata = {
  title: "Account Details",
  description: "Ecommerce Platform for Royal Mabati",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <ProtectedRoute>
        <Breadcrumb />
        <div className="flex gap-8">
          <AccountNav />
          <div className="flex flex-col min-w-[40vw] md:min-w-[50vw] flex-grow min-h-[75vh] bg-white shadow-md rounded-md max-w-full ">
            {children}
          </div>
        </div>
      </ProtectedRoute>
    </div>
  );
}
