import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PhoneLogin from "../pages/PhoneLogin/PhoneLogin";
import VerificationCode from "../pages/VerificationCode/VerificationCode";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import DeliveryForm from "../pages/DeliveryForm/DeliveryForm";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import Orders from "../pages/Orders/Orders";
import Search from "../pages/Search/Search";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { restoreActiveSessionThunk } from "../redux/auth/authSlice";
import CompanyDetails from "../pages/CompanyDetails/CompanyDetails";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(restoreActiveSessionThunk(authUser.uid));
      }
      setChecking(false);
    });
  }, [dispatch]);

  if (loading || checking) return <div>...Cargando</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route index element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/deliveryForm" element={<DeliveryForm />} />
          <Route path="phoneLogin" element={<PhoneLogin />} />
          <Route path="verificationCode/:phoneNumber" element={<VerificationCode />} />
          <Route path="register" element={<Register />} />
          <Route path="search" element={<Search />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="search" element={<Search />} />
          <Route path="*" element={<Navigate to={"/"} />} />
          <Route path="companydetails" element={<CompanyDetails />} />
          {/* <Route path="/company/:id" element={CompanyDetails} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
