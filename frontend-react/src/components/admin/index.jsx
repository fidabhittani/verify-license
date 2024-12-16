import { Navigate, Route, Routes } from "react-router";
import AadminLayout from "../../layout/admin";
import AdminLicense from "./licenses";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="" element={<AadminLayout />}>
        <Route index element={<Navigate to={"license"} />} />

        <Route path="license" element={<AdminLicense/>} />
        <Route path="user" element={<div>Register component goes here</div>} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
