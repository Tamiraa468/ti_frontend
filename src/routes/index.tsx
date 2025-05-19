import { PageLoading } from "@ant-design/pro-layout";
import { ErrorBoundary } from "@ant-design/pro-utils";
import { useAuthContext } from "context/auth";
import { menuItems } from "layout/dashboard/menu_items";
import { FC, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import auhtRoutes from "routes/auth";
import { IRoute } from "./types";
import DashboardRoutes from "routes/dashboard";
import { getNavigateRoute } from "utils/index";
const AuthLayout = lazy(() => import("layout/auth"));
const DashboardLayout = lazy(() => import("layout/dashboard"));

const MainRoutes: FC = () => {
  const [{ authorized, user }] = useAuthContext();

  const routes: IRoute[] = [
    {
      path: "/dashboard",
      key: "dashboard",
      component: <DashboardLayout />,
      children: DashboardRoutes(),
    },
  ];

  const navigateRoute = getNavigateRoute(user?.role_name || "");

  if (!authorized) {
    routes.push({
      path: "/auth",
      key: "auth",
      component: <AuthLayout />,
      children: auhtRoutes,
    });
  }
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.key}
          path={route.path}
          element={
            <ErrorBoundary>
              <Suspense fallback={<PageLoading />}>{route.component}</Suspense>
            </ErrorBoundary>
          }
        >
          {route?.children?.map((item) => {
            return (
              <Route
                key={item.key}
                path={item.path}
                element={
                  <ErrorBoundary>
                    <Suspense fallback={<PageLoading />}>
                      {item.component}
                    </Suspense>
                  </ErrorBoundary>
                }
              />
            );
          })}
        </Route>
      ))}
      <Route
        key={"root"}
        path="*"
        element={
          authorized ? (
            <Navigate to={navigateRoute} />
          ) : (
            <Navigate to="/auth/login" />
          )
        }
      />
    </Routes>
  );
};

export default MainRoutes;
