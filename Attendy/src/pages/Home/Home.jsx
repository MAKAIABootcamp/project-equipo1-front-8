import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Home = () => {
  const navigate = useNavigate();
  const handleClicklogin = () => {
    navigate("/Login");
  };

  return (
    <main>
      <Header></Header>
      <div className="mb-10">
        <button
          className="bg-[#00A082] text-white hover:text-black absolute p-4 rounded-2xl mt-60 max-md:ml-60	md:ml-40 z-10 px-10 text-2xl font-oleo"
          onClick={handleClicklogin}
        >
          Pedir domicilio
        </button>
        <img
          className="w-full h-[30rem] object-cover object-bottom-60 transform -scale-x-100 "
          src="/gif/descarga.gif"
          alt="Logo"
        />
      </div>
      <div className="md:flex p-5 w-4/5 m-auto mt-16 mb-16">
        <div className="md:px-10 flex flex-col justify-center">
          <h2 className="text-[#3C3C3C] text-[75px] font-oleo">
            ¿Quienes somos?
          </h2>
          <p className="text-[25px] text-[#3C3C3C] py-4 font-poppins text-justify">
            Somos una empresa comprometida en brindar a nuestros clientes un
            lugar confiable para realizar sus pedidos, mientras apoyamos y
            conectamos a microempresas de todos los rincones del país para que
            puedan ofrecer sus servicios de domicilio de manera eficiente
          </p>
        </div>
        <img
          className="w-[30rem] h-full self-center rounded-2xl"
          src="/gif/home_truc.gif"
          alt=""
        />
      </div>
      <div className="flex p-5 bg-[#00A082] text-center">
        <div className="md:px-10 w-4/5 m-auto mt-16 mb-16">
          <h2 className="text-[#f2f2f2] text-[75px] font-oleo">
            UNETE A NOSOTROS
          </h2>
          <p className="text-[25px] text-[#f2f2f2] py-4 font-poppins text-justify mb-5">
            ¿Te gustaría hacer crecer tu empresa y aumentar tu alcance llegando
            a más clientes? Únete a nosotros y aprovecha la oportunidad de
            expandir tu red de domicilios, mejorando la visibilidad de tu
            negocio y alcanzando nuevos mercados. Juntos, podemos ayudarte a
            optimizar tus servicios y a llevar tu empresa al siguiente nivel,
            conectando con más personas y ofreciendo una experiencia de entrega
            eficiente y de calidad.
          </p>
          <button
            className="bg-[#f2f2f2] text-[#00A082] p-4 rounded-2xl text-2xl font-oleo hover:text-black"
            onClick={handleClicklogin}
          >
            Conoce más
          </button>
        </div>
      </div>
      <div className="md:flex p-5 m-10 justify-center">
        <img
          className="w-[30rem] h-full self-center rounded-2xl"
          src="/gif/truc_delivery.gif"
          alt=""
        />
      <div className="md:px-10 md:flex lg:flex-col md:justify-center w-4/5 m-auto mt-16 mb-16">
        <h2 className="text-[#3C3C3C] text-[75px] font-oleo text-center">
          Nuestra Propuesta de Valor
        </h2>
        <p className="text-[25px] text-[#3C3C3C] py-4 font-poppins text-justify">
          Con nuestra plataforma, conectamos empresas con clientes y facilitamos la gestión eficiente de pedidos. Ofrecemos herramientas tecnológicas que optimizan el proceso de entrega, permitiendo que negocios de cualquier tamaño compitan y crezcan ofreciendo un servicio de calidad. Con cada pedido, fortaleces tu relación con los clientes y haces crecer tu empresa de manera sostenible.
        </p>
      </div>
      </div>
      <Footer></Footer>
    </main>
  );
};

export default Home;
