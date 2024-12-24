/* eslint-disable react-refresh/only-export-components */
import ProfileGuard from "@/components/guard/profileGuard";
import Loading from "@/components/base/loading";
import { lazy, Suspense } from "react";
const AboutView = lazy(() => import("@/pages/about/views"));
const AuthorView = lazy(() => import("@/pages/author/views"));
const HomePageView = lazy(() => import("@/pages/home/views"));
const ProfileView = lazy(() => import("@/pages/profile/view"));
const CreteBlogsView = lazy(() => import("@/pages/write/views"));

import { Route } from "react-router-dom";
import { MAIN_PATH } from "../index.enum";
export const MAIN_ROUTES = [
    <Route
      key="home"
      path={MAIN_PATH.HOME}
      element={
        <Suspense fallback={<Loading />}>
          <HomePageView />
        </Suspense>
      }
    />,
    <Route
      key="about"
      path={MAIN_PATH.ABOUT}
      element={
        <Suspense fallback={<Loading />}>
          <AboutView />
        </Suspense>
      }
    />,
    <Route
      key="profile"
      path={MAIN_PATH.PROFILE}
      element={
        <ProfileGuard>
          <Suspense fallback={<Loading />}>
            <ProfileView />
          </Suspense>
        </ProfileGuard>
      }
    />,
    <Route
      key="write"
      path={MAIN_PATH.WRITE}
      element={
        <Suspense fallback={<Loading />}>
          <CreteBlogsView />
        </Suspense>
      }
    />,
    <Route
      key="author"
      path={MAIN_PATH.AUTHOR + "/:id"}
      element={
        <Suspense fallback={<Loading />}>
          <AuthorView />
        </Suspense>
      }
    />
];
