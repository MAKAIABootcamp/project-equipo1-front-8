import SideBar from "../../components/SideBar";
import { ErrorMessage, Field, Form, Formik } from "formik";

const DeliveryForm = () => {
  return (
    <div>
      <nav>
        <SideBar />
      </nav>
      <div className="flex flex-col w-4/5 m-auto justify-center h-[100vh] items-center gap-10">
        <h1 className="font-poppins text-[#00A082] text-[40px] mb-20">
          Por favor ingresa los datos para entregar tu producto
        </h1>

        <Formik
          initialValues={{
            Address: "",
            PhoneNumber: "",
            Description: "",
          }}
          onSubmit={(values) => {
            console.log("Formulario enviado:", values);
          }}
        >
          {() => (
            <Form className="w-full max-w-[63%]">
              <div className="flex flex-col mb-4">
                <div className="border-[1px] border-[#00A082] py-2 px-4 mb-2">
                  <Field
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Ingresa aquí tu dirección"
                    className="w-full min-h-[30px] py-2 px-4 resize-none"
                  />
                </div>
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex flex-col mb-4">
                <div className="border-[1px] border-[#00A082] py-2 px-4 mb-2">
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
                <div className="border-[1px] border-[#00A082] py-2 px-4 mb-2">
                  <Field
                    as="textarea"
                    name="description"
                    id="description"
                    placeholder="Descripción del pedido"
                    className="w-full min-h-[100px] py-2 px-4 resize-none"
                  />
                </div>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                className="py-2 px-4 border-[1px] bg-[#00A082] text-white rounded-[30px] w-[10rem]"
              >
                Enviar
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DeliveryForm;
