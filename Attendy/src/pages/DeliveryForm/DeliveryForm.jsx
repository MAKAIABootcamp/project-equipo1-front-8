import SideBar from "../../components/SideBar";
import { createOrder } from "../../services/FirestoreService";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import { useAuth } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";

const validationSchema = Yup.object().shape({
  Address: Yup.string().required("La direccion de la empresa es obligatorio"),
  PhoneNumber: Yup.string().length(
    10,
    "El numero de telefono debe ser de 10 digitos"
  ),
  Description: Yup.string().required(
    "La descripcion del pedido es obligatoria"
  ),
});
const DeliveryForm = () => {
  const location = useLocation();
  const companyId = location.state?.companyId;
  const user = useAuth();
  const userName = user?.name || "Usuario Anónimo";
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleViewOrders = () => {
    navigate("/orders");
  };

  return (
    <div>
      <nav>
        <SideBar />
      </nav>
      <div className="flex flex-col w-4/5 m-auto justify-center h-[100vh] items-center gap-10">
        <h1 className="font-poppins text-[#00A082] lg:text-[40px] text-[30px] mb-20 text-center">
          Por favor ingresa los datos para tu pedido
        </h1>
        {isSubmitted && (
          <div className="text-[#00A082] mb-4">¡Pedido enviado con éxito!</div>
        )}

        <Formik
          initialValues={{
            Address: "",
            PhoneNumber: "",
            Description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await createOrder(companyId, {
                name: userName,
                address: values.Address,
                phoneNumber: values.PhoneNumber,
                description: values.Description,
              });
              setIsSubmitted(true);
              resetForm();
              setTimeout(() => setIsSubmitted(false), 3000);
            } catch (err) {
              console.error("Error al enviar los datos", err);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-full lg:max-w-[63%]">
              <div className="flex flex-col mb-4 ">
                <label className="ml-2 mb-2 font-bold font-poppins text-[#00A082] lg:text-start text-center">
                  Ingresa la dirección de destino
                </label>
                <div className="border-[1px] border-[#00A082] py-2 px-4 mb-2 rounded-[30px]">
                  <Field
                    type="text"
                    name="Address"
                    id="address"
                    placeholder="Ingresa aquí tu dirección"
                    className="w-full min-h-[30px] py-2 px-4 resize-none"
                  />
                </div>
                <ErrorMessage
                  name="Address"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="ml-2 mb-2 font-bold font-poppins text-[#00A082] lg:text-start text-center">
                  Ingresa numero de contacto
                </label>
                <div className="border-[1px] border-[#00A082] py-2 px-4 mb-2 rounded-[30px]">
                  <Field
                    type="number"
                    name="PhoneNumber"
                    id="PhoneNumber"
                    placeholder="Número de celular"
                    className="w-full min-h-[30px] py-2 px-4 resize-none"
                  />
                </div>
                <ErrorMessage
                  name="PhoneNumber"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="ml-2 mb-2 font-bold font-poppins text-[#00A082] lg:text-start text-center">
                  Ingresa la descripcion del pedido
                </label>
                <div className="border-[1px] border-[#00A082] py-2 px-4 mb-2 rounded-[30px]">
                  <Field
                    as="textarea"
                    name="Description"
                    id="description"
                    placeholder="Descripción del pedido"
                    className="w-full min-h-[100px] py-2 px-4 resize-none"
                  />
                </div>
                <ErrorMessage
                  name="Description"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex justify-between mt-7">
                <div>
                  <button
                    type="submit"
                    className="py-2 px-4 border-[1px] bg-[#00A082] text-white rounded-[30px] w-[10rem]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar"}
                  </button>
                </div>
                <div>
                  <button
                    className="py-2 px-4 border-[1px] bg-[#00A082] text-white rounded-[30px] w-[10rem]"
                    onClick={handleViewOrders}
                  >
                    Ver pedidos
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DeliveryForm;
