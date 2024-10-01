import { useLocation, useNavigate } from "react-router-dom";
const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { companyId } = location.state || {};
  const handleOrder = () => {
    if (companyId) {
      navigate("/deliveryForm", { state: { companyId } });
    } else {
      console.log("No se encontró el companyId");
    }
  };
  return (
    <div className="w-[80%] m-auto">
      <h1 className="font-oleo text-[40px] text-center mt-5">
        ¿Qué quieres hacer hoy?
      </h1>

      <div className="grid lg:grid-cols-3 mt-20 h-[80vh] gap-20 justify-items-center text-[#00A082] font-poppins">
        <div className="flex flex-col gap-5 ">
          <img
            className="w-[200px] h-[200px]"
            src="/icons/domiBasicos.svg"
            alt=""
          />
          <button
            className="py-2 px-4 rounded-[30px] w-[200px] transition-all duration-300 hover:bg-[#00A082] hover:text-white border-[1px] border-[#00A082]"
            onClick={handleOrder}
          >
            Domicilios básicos
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <img
            className="w-[200px] h-[200px]"
            src="/icons/pagoServicios.svg"
            alt=""
          />
          <button
            className="py-2 px-4 rounded-[30px] w-[200px] transition-all duration-300 hover:bg-[#00A082] hover:text-white border-[1px] border-[#00A082]"
            onClick={handleOrder}
          >
            Pago de Servicios
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <img
            className="w-[200px] h-[200px]"
            src="/icons/consignaciones.svg"
            alt=""
          />
          <button
            className="py-2 px-4 rounded-[30px] w-[200px] transition-all duration-300 hover:bg-[#00A082] hover:text-white border-[1px] border-[#00A082]"
            onClick={handleOrder}
          >
            Consignaciones
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <img
            className="w-[200px] h-[200px]"
            src="/icons/servicioTiempo.svg"
            alt=""
          />
          <button
            className="py-2 px-4 rounded-[30px] w-[200px] transition-all duration-300 hover:bg-[#00A082] hover:text-white border-[1px] border-[#00A082]"
            onClick={handleOrder}
          >
            Servicio de tiempo
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <img
            className="w-[200px] h-[200px]"
            src="/icons/tramitesBancarios.svg"
            alt=""
          />
          <button
            className="py-2 px-4 rounded-[30px] w-[200px] transition-all duration-300 hover:bg-[#00A082] hover:text-white border-[1px] border-[#00A082]"
            onClick={handleOrder}
          >
            Tramites bancarios
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <img
            className="w-[200px] h-[200px]"
            src="/icons/compras.svg"
            alt=""
          />
          <button
            className="py-2 px-4 lg:mb-0 mb-10 rounded-[30px] w-[200px] transition-all duration-300 hover:bg-[#00A082] hover:text-white border-[1px] border-[#00A082]"
            onClick={handleOrder}
          >
            Compras
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
