import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ModalProfile = ({ isOpen, onClose }) => {
  const { user } = useSelector((store) => store.auth);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50 font-poppins ">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md lg:w-full w-[80%] ">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#00A082]">
          Perfil de {user.isCompany ? "Empresa" : "Usuario"}
        </h1>
        <div className="w-full flex justify-center items-center">
          {user.photoUrl && (
            <img
              src={user.photoUrl}
              alt="Logo de la Empresa"
              className="max-h-[200px] object-contain mb-4 rounded-lg"
            />
          )}
        </div>

        <div className="space-y-4 overflow-y-auto ">
          {user.isCompany ? (
            <>
              <p>
                <strong className="text-[#00A082]">Empresa:</strong> {user.name}
              </p>

              <p className="break-words">
                <strong className="text-[#00A082] max-w-md">
                  Descripción:
                </strong>{" "}
                {user.description}
              </p>

              <p>
                <strong className="text-[#00A082]">Telefono:</strong>{" "}
                {user.telefono}
              </p>
              <p>
                <strong className="text-[#00A082]">Dirección:</strong>{" "}
                {user.address}
              </p>
              <p>
                <strong className="text-[#00A082]">Ciudad:</strong> {user.city}
              </p>
              <p>
                <strong className="text-[#00A082]">Titular:</strong>{" "}
                {user.titular}
              </p>
            </>
          ) : (
            <>
              <p>
                <strong className="text-[#00A082]">Nombre:</strong> {user.name}
              </p>
              <p>
                <strong className="text-[#00A082]">Email:</strong> {user.email}
              </p>
            </>
          )}
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

ModalProfile.propTypes = {
  isOpen: PropTypes.isRequired,
  onClose: PropTypes.isRequired,
};

export default ModalProfile;
