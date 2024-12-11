import { Routes, Route, Navigate } from "react-router";
import AppLayout from "../layout/app";
import AuthLayout from "../layout/auth";
import Home from "./home";
import AadminLayout from "../layout/admin";
import Admin from "./admin";

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={"app"} />} />

      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<>Login component goe here</>} />
        <Route
          path="register"
          element={<div>Register component goes here</div>}
        />
      </Route>

      <Route path="app" element={<AppLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="admin" element={<AadminLayout />}>
        <Route index element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
