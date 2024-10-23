import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../redux/auth/authSlice";
import { CiLogout } from "react-icons/ci";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((store) => store.auth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleClickLogin = () => {
    navigate("/Login");
  };

  const handleClickHome = () => {
    navigate("/Home");
  };

  const handleLogout = () => {
    dispatch(logoutThunk()).then(() => {
      navigate("/");
    });
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-[#E1E1E1] p-3">
      <div className="flex justify-between w-[95%] m-auto">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleClickHome}
        >
          <img className="w-[40px]" src="/icons/logo.svg" alt="Logo" />
          <p className="text-[#00A082] font-poppins text-2xl">Attendy</p>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center">
            <span className="text-[#00A082] font-poppins text-lg mr-4 text-end">
              {isMobile ? user.name.trim().split(/\s+/)[0] : user.name}
            </span>
            <button
              className="bg-[#00A082] text-white px-5 p-2 rounded-2xl flex items-center"
              onClick={handleLogout}
            >
              <span className="hidden md:inline">Cerrar sesión</span>
              <CiLogout className="w-5 h-5 md:hidden" />
            </button>
          </div>
        ) : (
          <button
            className="bg-[#00A082] text-white px-5 rounded-2xl flex items-center"
            onClick={handleClickLogin}
          >
            <img className="w-[35px]" src="/icons/userBlanco.svg" alt="Login" />

            <span className="ml-2 hidden lg:block">
              {user ? user.name : "Iniciar sesión"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
