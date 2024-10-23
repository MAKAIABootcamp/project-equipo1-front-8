import {useSelector } from "react-redux";

const ModalProfile = ({ isOpen, onClose }) => {
  if (!isOpen) return null; 
  const { user} = useSelector((store) => store.auth);
  
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Perfil de Usuario</h1>
        {user.photoUrl && (
          <img 
            src={user.photoUrl} 
            alt="Logo de la Empresa" 
            className="w-full h-auto mb-4 rounded-lg"
          />
        )}

        <div className="space-y-4">
          <p><strong>Nombre de usuario:</strong> {user.name}</p>
          <p><strong>Descripción:</strong> {user.description}</p>
          <p><strong>NIT:</strong> {user.nit}</p>
          <p><strong>Dirección:</strong> {user.address}</p>
          <p><strong>Ciudad:</strong> {user.city}</p>
          <p><strong>Titular:</strong> {user.titular}</p>
        </div>
        
        <button
          className="mt-6 p-3 bg-[#00A082] font-bold text-white rounded w-full hover:bg-[#008F6D]"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalProfile;
