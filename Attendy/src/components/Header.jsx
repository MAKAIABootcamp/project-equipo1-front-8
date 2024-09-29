import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  const handleClicklogin = () => {
    navigate("/Login");
  };
  const handleClick = () => {
    navigate("/Home");
  };
  return (
    <div className="bg-[#E1E1E1]  p-3 ">
      <div className="flex justify-between w-[95%] m-auto">
        <div className="flex items-center" onClick={handleClick}>
          <img className="w-[40px]" src="/icons/logo.svg" alt="Logo" />
          <p className="text-[#00A082] font-poppins text-2xl">Attendy</p>
        </div>
        <button
          className="bg-[#00A082] text-white px-5 rounded-2xl flex items-center"
          onClick={handleClicklogin}
        >
          <img className="w-[2rem]" src="/icons/user.svg" alt="" />
          Iniciar Sesion
        </button>
      </div>
    </div>
  );
};

export default Header;
