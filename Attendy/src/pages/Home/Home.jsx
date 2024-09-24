import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    navigate('/Search'); 
  };
  const handleClicklogin = () => {
    navigate('/Login'); 
  };

  return (
    <main>
        <Header></Header>
        <div>
          <button className="bg-[#00A082] text-white absolute p-4 rounded-2xl mt-60	ml-40 z-10 px-10 text-2xl font-oleo" onClick={handleClick}>Pedir domicilio</button>
          <img className="w-full h-[30rem] object-cover object-bottom-60 transform -scale-x-100 " src="/gif/descarga.gif" alt="Logo" />
        </div>
        <div className="flex p-5">
          <div className="px-10">
              <h2 className="text-[#3C3C3C] text-8xl font-oleo">¿Quienes somos?</h2>
              <p className="text-4xl text-[#3C3C3C] py-4 font-poppins text-justify">Somos una empresa comprometida en brindar a nuestros clientes un lugar confiable para realizar sus pedidos, mientras apoyamos y conectamos a microempresas de todos los rincones del país para que puedan ofrecer sus servicios de domicilio de manera eficiente</p>
          </div>
          <img className="w-[30rem] h-full self-center" src="/gif/home_truc.gif" alt="" />
        </div>
        <div className="flex p-5 bg-[#00A082] text-center">
          <div className="px-10">
              <h2 className="text-[#f2f2f2] text-8xl font-oleo">UNETE A NOSOTROS</h2>
              <p className="text-4xl text-[#f2f2f2] py-4 font-poppins text-justify">¿Te gustaría hacer crecer tu empresa y aumentar tu alcance llegando a más clientes? Únete a nosotros y aprovecha la oportunidad de expandir tu red de domicilios, mejorando la visibilidad de tu negocio y alcanzando nuevos mercados. Juntos, podemos ayudarte a optimizar tus servicios y a llevar tu empresa al siguiente nivel, conectando con más personas y ofreciendo una experiencia de entrega eficiente y de calidad.</p>
            <button className="bg-[#f2f2f2] text-[#00A082] p-4 rounded-2xl text-2xl font-oleo" onClick={handleClicklogin}>Conoce más</button>
          </div>
        </div>
        <div className="flex p-5">
          <img className="w-[30rem] h-[25rem] self-center	" src="/gif/truc_delivery.gif" alt="" />
          <div className="px-10">
              <h2 className="text-[#3C3C3C] text-8xl font-oleo text-center">Nuestra Propuesta de Valor</h2>
              <p className="text-4xl text-[#3C3C3C] py-4 font-poppins text-justify">Con nuestra plataforma, conectamos empresas con clientes y facilitamos la gestión eficiente de pedidos. Ofrecemos herramientas tecnológicas que optimizan el proceso de entrega, permitiendo que negocios de cualquier tamaño compitan y crezcan ofreciendo un servicio de calidad. Con cada pedido, fortaleces tu relación con los clientes y haces crecer tu empresa de manera sostenible.</p>
          </div>
        </div>
        <Footer></Footer>
    </main>
  );
  
};

export default Home;
