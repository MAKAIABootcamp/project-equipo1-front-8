import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    navigate('/'); 
  };

  return (
    <main>
        <Header></Header>
        <div>
          <button class="bg-[#00A082] text-white absolute p-4 rounded-2xl mt-60	ml-40 z-10 px-10 text-2xl font-oleo" onClick={handleClick}>Pedir domicilio</button>
          <img className="w-full h-[30rem] object-cover object-bottom-60 transform -scale-x-100 " src="/gif/descarga.gif" alt="Logo" />
        </div>
        <div class="flex p-5">
          <div class="px-10">
              <h2 class="text-[#3C3C3C] text-8xl font-oleo">¿Quienes somos?</h2>
              <p class="text-4xl text-[#3C3C3C] py-4 font-poppins">Somos una empresa comprometida en brindar a nuestros clientes un lugar confiable para realizar sus pedidos, mientras apoyamos y conectamos a microempresas de todos los rincones del país para que puedan ofrecer sus servicios de domicilio de manera eficiente</p>
          </div>
          <img class="w-[25rem]" src="/images/Home.png" alt="" />
        </div>
        <Footer></Footer>
    </main>
  );
  
};

export default Home;
