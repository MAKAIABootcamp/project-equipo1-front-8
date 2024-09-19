import { useState, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { clearError, createAccountThunk } from "../../redux/auth/authSlice";


const validationSchemaUsuario = Yup.object().shape({
  name: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede exceder los 50 caracteres")
    .required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[a-z]/, "Debe contener al menos una letra minúscula") 
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(/[0-9]/, "Debe contener al menos un número")
    .required("La contraseña es obligatoria"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Debe confirmar la contraseña"),
});

const validationSchemaEmpresa = Yup.object().shape({
  companyName: Yup.string().required("El nombre de la empresa es obligatorio"),
  nit: Yup.string()
    .length(9, "El NIT debe ser 9 digitos")
    .required("El NIT es obligatorio"),
  address: Yup.string().required("La direccion de la empresa es obligatorio"),
  titular: Yup.string().required("El nombre del titular es obligatorio"),
  email: Yup.string()
    .email("Ingrese un correo electronico válido")
    .required("El correo es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Debe confirmar la contraseña"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCompany, setIsCompany] = useState(false);

  const { error, isAuthenticated, user } = useSelector((store) => store.auth);

  if (error) {
    Swal.fire({
      title: "Oops!",
      text: "¡Ha ocurrido un error en la creación de tu cuenta!",
      icon: "error",
    }).then(() => dispatch(clearError()));
  }

  useEffect(() => {
    if (isAuthenticated) {
      Swal.fire({
        title: "Bienvenido",
        text: "!Has creado exitosamente la cuenta!",
        icon: "success",
      }).then(() => navigate("/login"));
    }
  }, [isAuthenticated, isCompany, user, navigate]);
  return (
    <main className="flex w-4/5 m-auto mt-20 font-poppins justify-between">
      <div className="flex flex-col items-center">
        <img className="w-[650px]" src="/icons/logo.svg" alt="" />
        <h1 className=" flex justify-center text-[70px] ml-10 text-[#00A082]">
          Attendy
        </h1>
      </div>
      <div className="flex flex-col items-center max-w-[40%]">
        <h1 className="font-oleo text-[50px] mb-5">Registrate</h1>
        <div className="mb-5">
          <button
            className={`py-2 px-4 rounded-[30px] w-[200px] mr-4 ${
              !isCompany
                ? "bg-[#00A082] text-white"
                : "bg-white border-[1px] border-[#00A082] text-[#878787]"
            }`}
            onClick={() => setIsCompany(false)}
          >
            Usuario
          </button>
          <button
            className={`py-2 px-4 rounded-[30px] w-[200px] ${
              isCompany
                ? "bg-[#00A082] text-white"
                : "bg-white border-[1px] border-[#00A082] text-[#878787]"
            }`}
            onClick={() => setIsCompany(true)}
          >
            Empresa
          </button>
        </div>

        <Formik
          initialValues={
            isCompany
              ? {
                  companyName: "",
                  nit: "",
                  address: "",
                  titular: "",
                  email: "",
                  password: "",
                  repeatPassword: "",
                }
              : { name: "", email: "", password: "", repeatPassword: "" }
          }
          validationSchema={
            isCompany ? validationSchemaEmpresa : validationSchemaUsuario
          }
          onSubmit={(values, { setSubmitting }) => {
            if (isCompany) {
              dispatch(
                createAccountThunk({
                  email: values.email,
                  password: values.password,
                  name: values.titular,
                  isCompany: true,
                  companyData: {
                    companyName: values.companyName,
                    nit: values.nit,
                    address: values.address,
                    titular: values.titular,
                  },
                })
              );
            } else {
              dispatch(
                createAccountThunk({
                  email: values.email,
                  password: values.password,
                  name: values.name,
                  isCompany: false,
                })
              );
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {!isCompany && (
                <>
                  <div className="flex flex-col items-start gap-10 mb-10 mt-5">
                    <div className="flex flex-col">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <Field
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Nombre"
                          className="w-[27rem]"
                        />
                      </div>
                      <ErrorMessage name="name" />
                    </div>
                    <div className="flex flex-col">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Correo Electronico"
                          className="w-[27rem]"
                        />
                      </div>
                      <ErrorMessage name="email" />
                    </div>

                    <div className="flex flex-col">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <Field
                          name="password"
                          id="password"
                          type="password"
                          placeholder="Contraseña"
                          className="w-[27rem]"
                        />
                      </div>
                      <ErrorMessage name="password" />
                    </div>

                    <div className="flex flex-col">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <Field
                          name="repeatPassword"
                          id="repeatPassword"
                          type="password"
                          placeholder="Repetir contraseña"
                          className="w-[27rem]"
                        />
                      </div>
                      <ErrorMessage name="repeatPassword" />
                    </div>
                  </div>
                </>
              )}
              {isCompany && (
                <>
                  <div className="flex flex-col items-start gap-10 mb-10 mt-5">
                    <div className="flex flex-col">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <Field
                          type="text"
                          name="companyName"
                          id="companyName"
                          placeholder="Nombre de la empresa"
                          className="w-[450px]"
                        />
                      </div>
                      <ErrorMessage name="companyName" />
                    </div>
                    <div className="flex w-5">
                      <div className="flex flex-col">
                        <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mr-2 w-[238px] mb-2">
                          <Field
                            type="text"
                            name="nit"
                            id="nit"
                            placeholder="NIT"
                            className="w-[212px]"
                          />
                        </div>
                        <ErrorMessage name="nit" />
                      </div>
                      <div className="flex flex-col">
                        <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 w-[238px] mb-2">
                          <Field
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Dirección"
                            className=" w-[212px]"
                          />
                        </div>
                        <ErrorMessage name="address" />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <Field
                          type="text"
                          name="titular"
                          id="titular"
                          placeholder="Nombre completo del titular"
                          className="w-[450px]"
                        />
                      </div>
                      <ErrorMessage name="titular" />
                    </div>

                    <div className="flex flex-col">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Correo electronico"
                          className="w-[450px]"
                        />
                      </div>
                      <ErrorMessage name="email" />
                    </div>

                    <div className="flex flex-col">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <Field
                          name="password"
                          id="password"
                          type="password"
                          placeholder="Contraseña"
                          className="w-[450px]"
                        />
                      </div>
                      <ErrorMessage name="password" />
                    </div>

                    <div className="flex flex-col">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <Field
                          name="repeatPassword"
                          id="repeatPassword"
                          type="password"
                          placeholder="Repetir contraseña"
                          className="w-[450px]"
                        />
                      </div>
                      <ErrorMessage name="repeatPassword" />
                    </div>
                  </div>
                </>
              )}
              <div className="border-[1px] rounded-[30px] bg-[#00A082] py-2 px-4 text-center text-white mb-10">
                <button disabled={isSubmitting} type="submit">
                  Crear Cuenta
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default Register;
