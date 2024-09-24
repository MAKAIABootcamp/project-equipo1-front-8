import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/Home'); 
  };
  return (
    <div className="bg-[#00A082] flex justify-between p-3 items-center">
        <div className="flex items-center" onClick={handleClick}>
            <p className="text-[#F2F2F2] font-poppins text-2xl">Attendy</p>
            <img className="w-[50px]" src="/icons/logoblanco.svg" alt="Logo" />
        </div>
        <p className="text-[#F2F2F2]">© 2024 Attendy Inc. All rights reserved.</p>
    </div>
  );
};

export default Footer;
