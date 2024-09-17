import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PhoneLogin from "../pages/PhoneLogin/PhoneLogin";
import VerificationCode from "../pages/VerificationCode/VerificationCode";
import Home from "../pages/Home/Home";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { restoreActiveSessionThunk } from "../redux/auth/authSlice";

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
          <Route path="phoneLogin" element={<PhoneLogin />} />
          <Route
            path="verificationCode/:phoneNumber"
            element={<VerificationCode />}
          />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
