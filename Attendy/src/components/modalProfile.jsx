import { useDispatch, useSelector } from "react-redux";

const ModalProfile = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Si no está abierto, no se muestra nada
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
        <h1 className="text-xl font-bold mb-4">Perfil de Usuario</h1>
        <p>Nombre de usuario: {user.name}</p>
        <p>Descripcion: {user.description}</p>
        <p>Nit: {user.nit}</p>
        <p>Dirección: {user.address}</p>
        <p>Ciudad: {user.city}</p>
        <p>Titular: {user.titular}</p>
        <button
          className="mt-4 p-2 bg-[#00A082] font-bold text-white rounded"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalProfile;
