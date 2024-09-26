import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react"; 
import SideBar from "../../components/SideBar";

const Orders = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate("/ordersPending"); 
  };

  return (
    <div className="flex">
      <SideBar/>
      <div className={`flex-grow flex flex-col ml-16`}>
        <div className="bg-[#E1E1E1] h-20 p-6 flex justify-between items-center">
          <p className="text-[#00A082] text-2xl font-poppins ml-44">
            Tus órdenes
          </p>
          <button className="bg-[#00A082] text-white px-5 rounded-2xl flex items-center">
            <img className="w-[3rem]" src="/icons/userBlanco.svg" alt="" />
            {user && user.name ? user.name : "Nombre de usuario"}
          </button>
        </div>
        <div className="flex-grow ml-24 p-24">
          <div className="bg-[#E1E1E1] rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Orden 1</h3>
              <button
                className="bg-[#00A082] text-white px-4 py-2 rounded-md"
                onClick={handleViewDetails}
              >
                Ver detalle &gt;
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Orden 1</h3>
              <p className="text-gray-500">Estado: Recibido</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-700">dd/mm/aaaa</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Orden 1</h3>
              <p className="text-gray-500">Estado: En camino</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-700">dd/mm/aaaa</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Orden 1</h3>
              <p className="text-gray-500">Estado: Entregado</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-700">dd/mm/aaaa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
