import { Navigate, Route, Routes } from "react-router";
import AppLayout from "../layout/app";
import AuthLayout from "../layout/auth";
import AdminRouter from "./admin";
import LoginForm from "./auth/login";
import Home from "./home";
import VerifyLicense from "./verify-license";
import SignUpForm from "./auth/register";
import { useQuery } from "@tanstack/react-query";
import { verifyTokenQuery } from "../services/user";
import { useContext } from "react";
import { UserContext } from "../contexts/user";

const AppRouter = () => {

  const { user, dispatchUser} = useContext(UserContext);


  // Check the cookie token from backend if the token is valid or not using tanstack query  react-query

  const { isError , data} = useQuery({
    queryKey: ["verifyTokenQuery"],
    queryFn: verifyTokenQuery,
    enabled: !user.authenticated,
  });

  if (isError) {
    dispatchUser({ type: "CLEAR_USER" });
  }



  if(data?.valid && !user.id){
    data.user.authenticated = true;
    dispatchUser({
      type: "SET_USER",
      payload: data.user,
    });
  }
  console.log("User: ", user);




  return (
    <Routes>
      <Route index element={<Navigate to={"app"} />} />

      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginForm/>} />
        <Route
          path="register"
          element={<SignUpForm />}
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

      <Route path="admin/*" element={<AdminRouter />}/>
      
    </Routes>
  );
};

export default AppRouter;
