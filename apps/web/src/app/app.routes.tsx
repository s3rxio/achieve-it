import { FC, lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute, useAuthStore, useFetchMe } from "../features/auth";
import TasksPage from "../pages/tasks";
import { MainLayout } from "./ui/layout.component";

const NotFoundPage = lazy(() => import("../pages/not-found"));
const LoginPage = lazy(() => import("../pages/login"));
const RegisterPage = lazy(() => import("../pages/register"));

export const Router: FC = () => {
  const meQuery = useFetchMe(false);
  const authStore = useAuthStore();
  const isLoggedIn = !!authStore.accessToken && !!authStore.refreshToken;

  useEffect(() => {
    const authStore = useAuthStore.getState();
    const isLoggedIn = !!authStore.accessToken && !!authStore.refreshToken;

    if (!isLoggedIn || meQuery.isFetching || (isLoggedIn && authStore.user)) {
      return;
    }

    if (meQuery.isError || meQuery.isStale) {
      authStore.clear();
      return;
    }

    if (
      isLoggedIn &&
      !authStore.user &&
      !meQuery.isLoading &&
      !meQuery.isSuccess
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
  }, [meQuery]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={<Navigate to={isLoggedIn ? "/tasks" : "/login"} />}
          />

          {/* Auth */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route
            path="tasks"
            element={
              <PrivateRoute>
                <TasksPage />
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
