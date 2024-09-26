import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate("/orders");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed z-10 p-2 lg:top-0 lg:left-0 bottom-0 lg:h-[100vh] border-r-2 bg-[#00A082] transition-all duration-300 ${
        isOpen ? "lg:w-[250px]" : "lg:w-[120px]"
      }`}
    >
      <div className="flex flex-col h-full p-2 justify-between">
        <div>
          <div
            className="flex items-center cursor-pointer mb-4"
            onClick={toggleMenu}
          >
            <img
              className="w-[80px] h-[80px] mb-2"
              src="/icons/logoblanco.svg"
              alt="Attendy"
            />
            {isOpen && (
              <span className="font-bold font-poppins text-white ml-2 text-3xl">
                Attendy
              </span>
            )}
          </div>
          <div
            className="flex items-center mb-4 cursor-pointer"
            onClick={handleViewDetails}
          >
            <img
              className="w-[80px] h-[80px] mb-2"
              src="/icons/listProducts.svg"
              alt="Pedidos"
            />
            {isOpen && (
              <span className="font-poppins text-white ml-4 text-lg">
                Pedidos
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <img
            className="w-[80px] h-[80px] mb-2"
            src="/icons/perfil.svg"
            alt="Cuenta"
          />
          {isOpen && (
            <span className="font-poppins text-white ml-2 text-lg">Cuenta</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
