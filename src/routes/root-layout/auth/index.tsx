/* eslint-disable react-refresh/only-export-components */
import AuthRegisterGuard from "@/components/guard";
import Loading from "@/components/base/loading";
import { lazy, Suspense } from "react";
const AuthPageView = lazy(() => import("@/pages/auth/views"));
const Registration = lazy(() => import("@/pages/registration/views"));
import { Route } from "react-router-dom";
import { MAIN_PATH } from "../index.enum";

export const AUTH_ROUTES = [
    <Route
    key='login'
      path={MAIN_PATH.LOGIN}
      element={
        <AuthRegisterGuard>
          <Suspense fallback={<Loading />}>
            <AuthPageView />
          </Suspense>
        </AuthRegisterGuard>
      }
    />,
    <Route
    key='register'
      path={MAIN_PATH.REGISTER}
      element={
        <AuthRegisterGuard>
          <Suspense fallback={<Loading />}>
            <Registration />
          </Suspense>
        </AuthRegisterGuard>
      }
    />

];
