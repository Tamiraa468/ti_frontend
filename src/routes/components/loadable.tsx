import { PageLoading } from "@ant-design/pro-layout";
import { lazy, Suspense } from "react";
import { Factory, RC } from "../types";
import ErrorBoundary from "./error_boundary";

const _Loadable = (Component: RC) => (props: any) =>
  (
    <ErrorBoundary>
      <Suspense fallback={<PageLoading />}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );

const Loader = (factory: Factory) => _Loadable(lazy(() => factory));

export default Loader;
