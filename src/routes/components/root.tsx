import { useAuthContext } from "context/auth";

import { FC } from "react";
import { Navigate } from "react-router-dom";

const Root: FC = () => {
  const [{ authorized }] = useAuthContext();
  if (!authorized) {
    return (
      <>
        <Navigate to={"/auth/login"} replace={true} />
      </>
    );
  }
  return (
    <>
      <Navigate to={"dashboard/dashboard"} replace={true} />
    </>
  );
};

export default Root;
