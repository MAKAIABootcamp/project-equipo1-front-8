import { useState, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { clearError, createAccountThunk } from "../../redux/auth/authSlice";
import uploadFiles from "../../services/uploadFiles";

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
  name: Yup.string().required("El nombre de la empresa es obligatorio"),
  nit: Yup.string()
    .length(9, "El NIT debe ser 9 digitos")
    .required("El NIT es obligatorio"),
  address: Yup.string().required("La direccion de la empresa es obligatorio"),
  titular: Yup.string().required("El nombre del titular es obligatorio"),
  email: Yup.string()
    .email("Ingrese un correo electronico válido")
    .required("El correo es obligatorio"),
  description: Yup.string().required(
    "La descripcion del pedido es obligatoria"
  ),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[a-z]/, "Debe contener al menos una letra minúscula")
    .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .matches(/[0-9]/, "Debe contener al menos un número")
    .required("La contraseña es obligatoria"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Debe confirmar la contraseña"),
  photo: Yup.mixed().required("debe ser obligatorio"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCompany, setIsCompany] = useState(false);
  const { error, isRegistered, user, isAuthenticated } = useSelector(
    (store) => store.auth
  );

  if (error) {
    Swal.fire({
      title: "Oops!",
      text: "¡Ha ocurrido un error en la creación de tu cuenta!",
      icon: "error",
    }).then(() => dispatch(clearError()));
  }

  useEffect(() => {
    if (isAuthenticated) {
      if (user.isCompany) {
        navigate("/admin");
      } else {
        navigate("/search");
      }
    }
  }, [isRegistered, isAuthenticated, isCompany, user, navigate, dispatch]);
  return (
    <main className="flex h-screen">
      <div className="flex flex-col justify-center items-center w-1/2">
        <img className="w-[650px]" src="/icons/logo.svg" alt="Logo" />
        <h1 className="flex justify-center text-[70px] text-[#00A082] font-oleo">
          Attendy
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center w-1/2">
        <h1 className="font-oleo text-[50px] mb-5">Registrate</h1>
        <div className="mb-5">
          <button
            className={`py-2 px-4 rounded-[30px] w-[228px] mr-4 ${
              !isCompany
                ? "bg-[#00A082] text-white"
                : "bg-white border-[1px] border-[#00A082] text-[#878787]"
            }`}
            onClick={() => setIsCompany(false)}
          >
            Usuario
          </button>
          <button
            className={`py-2 px-4 rounded-[30px] w-[228px] ${
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
                  name: "",
                  nit: "",
                  address: "",
                  titular: "",
                  email: "",
                  description: "",
                  password: "",
                  repeatPassword: "",
                  photo: "",
                }
              : { name: "", email: "", password: "", repeatPassword: "" }
          }
          validationSchema={
            isCompany ? validationSchemaEmpresa : validationSchemaUsuario
          }
          onSubmit={async (values, { setSubmitting }) => {
            let profileImage;
            if (isCompany && values.photo) {
              profileImage = await uploadFiles(values.photo);
              if (profileImage) {
                values.photo = profileImage;
              } else {
                Swal.fire({
                  title: "Error",
                  text: "Hubo un problema al subir la imagen",
                  icon: "error",
                });
                return;
              }
            }
            if (isCompany) {
              dispatch(
                createAccountThunk({
                  email: values.email,
                  password: values.password,
                  isCompany: true,
                  companyData: {
                    name: values.name,
                    nit: values.nit,
                    address: values.address,
                    description: values.description,
                    titular: values.titular,
                    photo: profileImage || "",
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
          {({ values, isSubmitting, setFieldValue }) => (
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
                          name="name"
                          id="name"
                          placeholder="Nombre de la empresa"
                          className="w-[450px]"
                        />
                      </div>
                      <ErrorMessage name="name" />
                    </div>
                    <div className="flex w-5">
                      <div className="flex flex-col">
                        <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mr-2 w-[238px] mb-2">
                          <Field
                            type="text"
                            name="nit"
                            id="nit"
                            value={values.nit || ""}
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
                            value={values.address || ""}
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
                          value={values.titular || ""}
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
                          value={values.email || ""}
                          placeholder="Correo electronico"
                          className="w-[450px]"
                        />
                      </div>
                      <ErrorMessage name="email" />
                    </div>

                    <div className="flex flex-col">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <Field
                          name="description"
                          id="description"
                          as="textarea"
                          placeholder="Descripción de la empresa"
                          className="w-[450px]"
                        />
                      </div>
                      <ErrorMessage name="repeatPassword" />
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

                    <div className="flex flex-col">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <input
                          className="w-[450px]"
                          type="file"
                          name="photo"
                          accept="image/*"
                          onChange={(event) => {
                            setFieldValue(
                              "photo",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                      </div>
                      <ErrorMessage name="photo" />
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
