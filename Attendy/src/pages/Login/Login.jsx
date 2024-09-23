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

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingrese un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((store) => store.auth);

  const handleGoogleLogin = () => {
    dispatch(googleLoginThunk());
  };

  const handleNavigatePhoneLogin = () => navigate("/phoneLogin");

  if (error) {
    Swal.fire({
      title: "Oops!",
      text: "¡Ha ocurrido un error en el inicio de sesión! Verifique sus credenciales",
      icon: "error",
    }).then(() => dispatch(clearError()));
  }

  if (isAuthenticated) {
    Swal.fire({
      title: "¡Has iniciado sesión exitosamente!",
      text: `¡Te damos la bienvenida`,
      icon: "success",
    }).then(() => navigate("/"));
  }

  return (
    <main className="flex h-screen">
      <div className="flex flex-col justify-center items-center w-1/2 bg-[#00A082]">
        <img className="w-[650px]" src="/icons/logoblanco.svg" alt="Logo" />
        <h1 className="flex justify-center text-[70px] text-[#F2F2F2]">
          Attendy
        </h1>
      </div>

      <div className="flex flex-col justify-center items-center w-1/2">
        <h1 className="font-oleo text-[50px] mb-5">Iniciar Sesión</h1>
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
            <Form
              autoComplete="off"
              className="flex flex-col items-start gap-10 mb-10 mt-5"
            >
              <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 w-[27rem]">
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Ingrese su correo electronico"
                  className="w-full"
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />

              <div className="border-[1px] rounded-[30px] border-gray-500 py-2 px-4 w-[27rem]">
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Ingrese su contraseña"
                  className="w-full"
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
                className={`w-[27rem] p-2 bg-[#00A082] text-white font-semibold rounded-[30px] mt-4 ${
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

        <p>
          Si aún no tiene una cuenta, por favor dar click{" "}
          <Link to={"/register"}>aquí!</Link>
        </p>

        <section className="mt-10">
          <span className="flex justify-center">
            o, también puedes iniciar sesión con:
          </span>
          <div className="flex flex-col gap-5 mt-5">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-[27rem] p-2 bg-white text-gray-700 font-semibold border border-gray-300 rounded-[30px] shadow-md hover:bg-gray-100 transition duration-300"
            >
              <img
                src="/icons/google-icon.svg"
                alt="Google logo"
                className="w-5 h-5 mr-3"
              />
              Iniciar sesión con Google
            </button>
            <button
              onClick={handleNavigatePhoneLogin}
              className="w-[27rem] p-2 bg-[#00A082] text-white font-semibold rounded-[30px] hover:bg-[#008D72]"
            >
              Iniciar sesión con Teléfono
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
