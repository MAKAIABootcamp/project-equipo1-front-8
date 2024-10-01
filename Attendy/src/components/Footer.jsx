import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Home");
  };
  return (
    <div className="bg-[#00A082] p-3 items-center">
      <div className="flex justify-between w-[95%] m-auto">
        <div className="flex items-center" onClick={handleClick}>
          <img className="w-[40px]" src="/icons/logoblanco.svg" alt="Logo" />
          <p className="text-[#F2F2F2] font-poppins text-2xl lg:block hidden">
            Attendy
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-[#F2F2F2] text-end	">
            © 2024 Attendy Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
