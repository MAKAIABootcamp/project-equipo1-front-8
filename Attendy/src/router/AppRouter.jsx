import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PhoneLogin from "../pages/PhoneLogin/PhoneLogin";
import VerificationCode from "../pages/VerificationCode/VerificationCode";

// import Feed from "../pages/Feed/Feed";
// import PostDetails from "../pages/PostDetails/PostDetails";
// import Profile from "../pages/Profile/Profile";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="phoneLogin" element={<PhoneLogin/> } />
          <Route path="verificationCode/:phoneNumber" element={<VerificationCode />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="feed" element={<Feed />} /> */}
          {/* <Route path="post/:postId" element={<PostDetails />} /> */}
          {/* <Route path="profile/:userId" element={<Profile />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
