import { useSelector } from "react-redux";
import SideBar from "../../components/SideBar";
import { useState } from "react";

const AdminPanel = () => {
  const { user } = useSelector((store) => store.auth);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <SideBar isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
      <div className="flex-grow flex flex-col">
        <div className="bg-[#E1E1E1] h-20 p-6 flex justify-between items-center">
          <p
            className={`text-[#00A082] text-2xl font-poppins ml-60 transition-transform duration-300 ${
              isOpen ? "translate-x-[130px]" : "translate-x-0"
            }`}
          >
            Bienvenido, {user ? user.name : "Usuario"}
          </p>
          <button className="bg-[#00A082] text-white px-5 rounded-2xl flex items-center">
            <img className="w-[3rem]" src="/icons/userBlanco.svg" alt="" />
            {user ? user.name : "Nombre de usuario"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
