import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(store=>store.auth)
  const handleClick = () => {
    navigate('/login'); 
  };
  const handleLogout = () => dispatch(logoutThunk());
  return (
    <div class="bg-[#E1E1E1] flex justify-between p-3">
        <div class="flex items-center">
            <p class="text-[#00A082] font-poppins text-2xl">Attendy</p>
            <img className="w-[50px]" src="/icons/logo.svg" alt="Logo" />
        </div>
      <button class="bg-[#00A082] text-white px-5 rounded-2xl flex items-center" onClick={handleClick}>
        <img class="w-[2rem]" src="/icons/user.svg" alt="" />
        Iniciar Sesion
        </button>
    </div>
  );
};

export default Header;
