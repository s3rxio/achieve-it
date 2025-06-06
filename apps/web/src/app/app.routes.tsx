import { FC, lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute, useAuthStore, useFetchMe } from "../features/auth";
import { MainLayout } from "./ui/layout.component";

const HomePage = lazy(() => import("../pages/home"));
const NotFoundPage = lazy(() => import("../pages/not-found"));
const LoginPage = lazy(() => import("../pages/login"));
const RegisterPage = lazy(() => import("../pages/register"));

export const Router: FC = () => {
  const authStore = useAuthStore();
  const isLoggedIn = !!authStore.accessToken && !!authStore.refreshToken;

  const meQuery = useFetchMe(false);

  useEffect(() => {
    if ((isLoggedIn && authStore.user) || meQuery.isFetching || !isLoggedIn) {
      return;
    }

    if (meQuery.isError) {
      useAuthStore.getState().clear();
      return;
    }

    if (
      !authStore.user &&
      !meQuery.isLoading &&
      !meQuery.isSuccess &&
      !meQuery.isStale
    ) {
      meQuery.refetch({
        cancelRefetch: true
      });
      return;
    }

    if (meQuery.isSuccess) {
      authStore.setUser(meQuery.data);
      return;
    }
  }, [isLoggedIn, authStore.user, meQuery, authStore]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={isLoggedIn ? <Navigate to="/tasks" /> : <HomePage />}
          />

          {/* Auth */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route
            path="tasks"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <NotFoundPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
