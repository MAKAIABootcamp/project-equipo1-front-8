import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  clearError,
  googleLoginThunk,
  loginWithEmailAndPassworThunk,
} from "../../redux/auth/authSlice";
import Swal from "sweetalert2";
import { useEffect } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated, user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (isAuthenticated) {
      if (user.isCompany) {
        navigate("/admin");
      } else {
        navigate("/search");
      }
    }
  }, [isAuthenticated, navigate, user]);

  const handleGoogleLogin = () => {
    dispatch(googleLoginThunk({ isCompany: false }));
  };

  if (error) {
    Swal.fire({
      title: "Oops!",
      text: "¡Ha ocurrido un error en el inicio de sesión! Verifique sus credenciales",
      icon: "error",
    }).then(() => dispatch(clearError()));
  }

  return (
    <main className="lg:flex h-screen flex lg:flex-row flex-col  items-center lg:bg-white">
      <div className="flex flex-col justify-center items-center lg:w-1/2 lg:bg-[#00A082]">
        <img
          className="hidden lg:block lg:w-[650px] w-[40%]"
          src="/icons/logoblanco.svg"
          alt="Logo"
        />

        <img
          className="lg:hidden block w-[40%] lg:w-[650px]"
          src="/icons/logo.svg"
          alt="Logo"
        />

        <h1 className="lg:flex justify-center text-[70px] text-[#F2F2F2] font-oleo hidden">
          Attendy
        </h1>
      </div>

      <div className="flex flex-col justify-center items-center w-1/2">
        <h1 className="font-oleo lg:text-[50px] text-[40px] text-black pt-6 mb-5">
          Iniciar Sesión
        </h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(loginWithEmailAndPassworThunk(values));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col items-start gap-10 mb-10 mt-5 ">
              <div className="border-[1px] rounded-[30px] bg-white border-gray-500 py-2 lg:px-4 px-20 mx-20 lg:w-[27rem]">
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Ingrese su correo electronico"
                  className="w-56"
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <div className="border-[1px] rounded-[30px] bg-white border-gray-500 py-2 lg:px-4 px-20 mx-20 lg:w-[27rem]">
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Ingrese su contraseña"
                  className="w-56"
                />
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`lg:w-[27rem] w-80 p-2 bg-[#00A082]  text-white font-semibold rounded-[30px] lg:mt-4 lg:px-20 lg:mx-20 mx-28 mb-8 ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#008D72]"
                }`}
              >
                Iniciar sesión
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-[15px] lg:text-base text-center text-black  mx-2 lg:mx-12 mb-6">
          Si aún no tiene una cuenta, por favor dar click{" "}
          <Link
            className="rounded-2xl text-[#00A082] font-poppins font-bold"
            to={"/register"}
          >
            AQUI
          </Link>
        </p>

        <section className="mb-10">
          <span className="flex justify-center text-black  mb-5">
            o, también puedes iniciar sesión con:
          </span>
          <div className="flex flex-col gap-5 mt-5">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center lg:w-[27rem] w-80 p-2 bg-white text-gray-700 font-semibold border border-gray-300 rounded-[30px] shadow-md hover:bg-gray-100 transition duration-300"
            >
              <img
                src="/icons/google-icon.svg"
                alt="Google logo"
                className="w-5 h-5 mr-3"
              />
              Iniciar sesión con Google
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
