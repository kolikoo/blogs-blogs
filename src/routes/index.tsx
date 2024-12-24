import Layout from "@/components/layout";
import { Navigate, Route, Routes } from "react-router-dom";
import { BASIC_PATH } from "./index.enum";
import { ROOT_LAYOUT_ROUTES } from "./root-layout";
import { lazy, Suspense } from "react";
import Loading from "@/components/base/loading";
const NotFound = lazy(() => import("@/pages/notFound"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/:lang" element={<Layout />}>
        {ROOT_LAYOUT_ROUTES}
      </Route>
      <Route
       
        path={BASIC_PATH.ROOT}
        element={<Navigate to={BASIC_PATH.REDIRECT} />}
      />
      <Route
        
        path={BASIC_PATH.NOTFOUND}
        element={
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
