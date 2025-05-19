import { FC } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-full">
      <div
        className="hidden sm:block col-span-2 "
        style={{
          backgroundImage: `url(/background/login.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        className="col-span-1 w-full h-screen flex justify-center items-center relative"
        style={{
          backgroundSize: "cover",
        }}
      >
        <div className="w-2/3 lg:w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
