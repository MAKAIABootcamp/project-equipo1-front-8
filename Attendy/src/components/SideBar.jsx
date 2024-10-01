import { useState } from "react";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="fixed top-4 left-4 z-20 lg:hidden p-2 bg-[#00A082] text-white rounded-md focus:outline-none "
        onClick={toggleMenu}
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        )}
      </button>

      <nav
        className={`fixed z-10 top-0 left-0 bottom-0 bg-[#00A082] transition-all duration-300 cursor-pointer ${
          isOpen ? "lg:w-[300px]" : "-translate-x-full"
        } lg:translate-x-0 lg:w-[120px] lg:h-[100vh] lg:border-r-2`}
        onClick={toggleMenu}
      >
        <div className="flex flex-col h-full p-4 justify-between lg:p-2 ">
          <div className="flex items-center mb-10 lg:mt-0 mt-10">
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

          <div className="flex items-center">
            <img
              className="w-[65px] h-[65px] mb-2"
              src="/icons/perfil.svg"
              alt="Cuenta"
            />
            {isOpen && (
              <span className="font-poppins text-white ml-2 text-lg">
                Cuenta
              </span>
            )}
          </div>
        </div>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-0 lg:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default SideBar;
