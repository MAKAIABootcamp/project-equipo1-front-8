import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../redux/auth/authSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(store=>store.auth)

  const handleLogout = () => dispatch(logoutThunk());

  return (
    <div class="bg-[#00A082] flex justify-between p-3 items-center">
        <div class="flex items-center">
            <p class="text-[#F2F2F2] font-poppins text-2xl">Attendy</p>
            <img className="w-[50px]" src="/icons/logoblanco.svg" alt="Logo" />
        </div>
        <p class="text-[#F2F2F2]">© 2024 Attendy Inc. All rights reserved.</p>
    </div>
  );
};

export default Footer;
