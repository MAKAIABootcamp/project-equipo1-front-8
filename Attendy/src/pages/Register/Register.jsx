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
  city: Yup.string().required("La ciudad es obligatorio"),
  department: Yup.string().required("El departamento es obligatorio"),
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

  const handleClickHome = () => {
    navigate("/");
  };
  return (
    <main className="flex lg:flex-row flex-col items-center overflow-y-auto min-h-screen justify-center">
      <div className="flex flex-col justify-center items-center lg:w-1/2 md:w-[200px] w-[40%]">
        <img
          className="w-[650px] cursor-pointer"
          src="/icons/logo.svg"
          alt="Logo"
          onClick={handleClickHome}
        />
        <h1 className="lg:flex justify-center text-[70px] text-[#00A082] font-oleo hidden">
          Attendy
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center w-1/2">
        <h1 className="font-oleo lg:text-[50px] text-[40px] mb-5">
          Registrate
        </h1>
        <div className="flex mb-5">
          <button
            className={`py-2 px-4 rounded-[30px] lg:w-[228px] w-[150px] mr-4 ${
              !isCompany
                ? "bg-[#00A082] text-white"
                : "bg-white border-[1px] border-[#00A082] text-[#878787]"
            }`}
            onClick={() => setIsCompany(false)}
          >
            Usuario
          </button>
          <button
            className={`py-2 px-4 rounded-[30px] lg:w-[228px] w-[150px] ${
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
                  city: "",
                  department: "",
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
                    city: values.city,
                    department: values.department,
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
            <Form className="h-auto">
              {!isCompany && (
                <>
                  <div className="flex flex-col items-center gap-10 mb-10 mt-5">
                    <div className="flex flex-col items-center">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <Field
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Nombre"
                          className="lg:w-[27rem] w-[20rem]"
                        />
                      </div>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Correo Electronico"
                          className="lg:w-[27rem] w-[20rem]"
                        />
                      </div>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <Field
                          name="password"
                          id="password"
                          type="password"
                          placeholder="Contraseña"
                          className="lg:w-[27rem] w-[20rem]"
                        />
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <Field
                          name="repeatPassword"
                          id="repeatPassword"
                          type="password"
                          placeholder="Repetir contraseña"
                          className="lg:w-[27rem] w-[20rem]"
                        />
                      </div>
                      <ErrorMessage
                        name="repeatPassword"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                </>
              )}
              {isCompany && (
                <>
                  <div className="flex flex-col items-start gap-10 mb-10 mt-5">
                    <div className="flex flex-col items-center">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <Field
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Nombre de la empresa"
                          className="lg:w-[450px] w-[20rem]"
                        />
                      </div>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex w-5">
                      <div className="flex flex-col items-center">
                        <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mr-2 lg:w-[238px] w-[170px] mb-2">
                          <Field
                            type="text"
                            name="nit"
                            id="nit"
                            value={values.nit || ""}
                            placeholder="NIT"
                            className="lg:w-[212px] w-[140px]"
                          />
                        </div>
                        <ErrorMessage
                          name="nit"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 lg:w-[238px] w-[175px] mb-2">
                          <Field
                            type="text"
                            name="address"
                            id="address"
                            value={values.address || ""}
                            placeholder="Dirección"
                            className="lg:w-[212px] w-[140px]"
                          />
                        </div>
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex w-5">
                      <div className="flex flex-col items-center">
                        <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mr-2 lg:w-[238px] w-[170px] mb-2">
                          <Field
                            type="text"
                            name="city"
                            id="city"
                            value={values.city || ""}
                            placeholder="Ciudad"
                            className="lg:w-[212px] w-[140px]"
                          />
                        </div>
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 lg:w-[238px] w-[175px] mb-2">
                          <Field
                            type="text"
                            name="department"
                            id="department"
                            value={values.department || ""}
                            placeholder="Departamento"
                            className="lg:w-[212px] w-[150px]"
                          />
                        </div>
                        <ErrorMessage
                          name="department"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <Field
                          type="text"
                          name="titular"
                          id="titular"
                          value={values.titular || ""}
                          placeholder="Nombre completo del titular"
                          className="lg:w-[450px] w-[20rem]"
                        />
                      </div>
                      <ErrorMessage
                        name="titular"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          value={values.email || ""}
                          placeholder="Correo electronico"
                          className="lg:w-[450px] w-[20rem]"
                        />
                      </div>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <Field
                          name="description"
                          id="description"
                          as="textarea"
                          placeholder="Descripción de la empresa"
                          className="lg:w-[450px] w-[20rem]"
                        />
                      </div>
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="flex w-5">
                      <div className="flex flex-col items-center">
                        <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mr-2 lg:w-[238px] w-[170px] mb-2">
                          <Field
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Contraseña"
                            className="lg:w-[212px] w-[140px]"
                          />
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 lg:w-[238px] w-[175px] mb-2">
                          <Field
                            name="repeatPassword"
                            id="repeatPassword"
                            type="password"
                            placeholder="Repetir contraseña"
                            className="lg:w-[212px] w-[150px]"
                          />
                        </div>
                        <ErrorMessage
                          name="repeatPassword"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 mb-2">
                        <input
                          className="lg:w-[450px] w-[20rem]"
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
                      <ErrorMessage
                        name="photo"
                        component="div"
                        className="text-red-500 text-sm"
                      />
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
