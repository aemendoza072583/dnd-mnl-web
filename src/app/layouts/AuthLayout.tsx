import React from "react";
import GridShape from "@/shared/components/common/GridShape";
import { Link } from "react-router";

import logo_64 from "@/assets/images/logo/logo_64.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="bg-brand-950 relative hidden h-full w-full items-center lg:grid lg:w-1/2 dark:bg-white/5">
          <div className="z-1 flex items-center justify-center">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
                <img
                  src={logo_64}
                  alt="Logo"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
