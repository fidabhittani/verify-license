import { Routes, Route, Navigate } from "react-router";
import AppLayout from "../layout/app";
import AuthLayout from "../layout/auth";
import Home from "./home";
import AadminLayout from "../layout/admin";
import Admin from "./admin";
import VerifyLicense from "./verify-license";

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
        <Route index element={<Navigate to={"home"} />} />
        <Route path="home" element={<Home />} />
        <Route
          path="services"
          element={<h4>Services Component - inserted here</h4>}
        />
        <Route path="driving-license" element={<VerifyLicense />} />
        <Route
          path="media"
          element={<code>media Component - inserted here</code>}
        />
        <Route
          path="downloads"
          element={<code>downloads Component - inserted here</code>}
        />
        <Route
          path="about-us"
          element={<code>About US Component - inserted here</code>}
        />
        <Route
          path="contact-us"
          element={<code>Contact US Component - inserted here</code>}
        />
        <Route path="*" element={<code>NOT FOUND</code>} />
      </Route>

      <Route path="admin" element={<AadminLayout />}>
        <Route index element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
