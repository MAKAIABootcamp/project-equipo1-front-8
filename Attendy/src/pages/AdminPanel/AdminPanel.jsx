import SideBar from "../../components/SideBar";

const AdminPanel = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-grow flex flex-col">
        <div className="bg-[#E1E1E1] h-20 p-6 flex justify-between items-center">
          <p className="text-[#00A082] text-2xl font-poppins ml-44">
            Bienvenido
          </p>
          <button className="bg-[#00A082] text-white px-5 rounded-2xl flex items-center">
            <img className="w-[3rem]" src="/icons/userBlanco.svg" alt="" />
            Nombre de usuario
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
