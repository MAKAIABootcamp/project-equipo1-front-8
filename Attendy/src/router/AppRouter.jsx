import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PhoneLogin from "../pages/PhoneLogin/PhoneLogin";
import VerificationCode from "../pages/VerificationCode/VerificationCode";
import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route index element={<Home />} />
          <Route path="phoneLogin" element={<PhoneLogin />} />
          <Route
            path="verificationCode/:phoneNumber"
            element={<VerificationCode />}
          />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
