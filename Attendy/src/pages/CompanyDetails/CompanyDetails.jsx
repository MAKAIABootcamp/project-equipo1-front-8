import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { database } from "../../Firebase/firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [otherCompanies, setOtherCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const companyRef = doc(database, "companies", id);
      const companySnap = await getDoc(companyRef);
      if (companySnap.exists()) {
        setCompany(companySnap.data());
      } else {
        console.log("Empresa no encontrada");
      }
    };

    const fetchOtherCompanies = async () => {
      const companiesRef = collection(database, "companies");
      const companiesSnap = await getDocs(companiesRef);
      const companiesData = companiesSnap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log("Otras empresas:", companiesData);
      setOtherCompanies(companiesData);
    };

    fetchCompanyDetails();
    fetchOtherCompanies();
  }, [id]);

  if (!company) return <div>Cargando...</div>;

  const filteredCompanies = otherCompanies.filter(
    (otherCompany) => otherCompany.id !== id
  );

  const handleOrder = (companyId) => {
    navigate("/services", { state: { companyId } });
    console.log("ID de la empresa:", companyId);
  };

  return (
    <main>
      <Header />
      <div className="p-9 m-16 bg-bg-gray">
        <h1 className="text-3xl font-oleo mb-2 flex justify-center">
          {company.name}
        </h1>
        <div className="flex items-center justify-center m-5">
          <div className="flex mb-5 justify-center items-center text-center">
            <img
              src={company.photoUrl}
              className="w-40 h-40 mr-5"
              alt={company.name}
            />
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col font-poppins text-center">
                <p>Dirección: {company.address}</p>
                <p>Horario: 8:00 am a 10:00 pm</p>
              </div>
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={"w-5 h-5 text-yellow-500"}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 15.27L16.18 19 14.54 12.97 20 8.24l-8.19-.69L10 2 8.19 7.55 0 8.24l5.46 4.73L3.82 19z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="mb-5 font-poppins text-justify text-xl">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt eius
          veniam placeat odit ullam beatae possimus nulla adipisci doloribus ut
          numquam omnis debitis perferendis, consequuntur sit repellat atque
          neque quae iusto similique deserunt incidunt hic. Excepturi officia
          aperiam illum aspernatur? Corrupti velit ratione reprehenderit
          architecto incidunt illo, perferendis porro labore provident quos!
        </p>
        <div className="flex justify-center mt-5 pt-5">
          <button
            className="bg-[#00A082] text-white py-1 px-6 rounded-full hover:bg-blue-600 font-oleo"
            onClick={() => handleOrder(company.id)}
          >
            Hacer Pedido
          </button>
        </div>
      </div>
      <div className="p-1 m-11">
        <h1 className="text-4xl font-oleo mb-5 flex justify-center">
          Más aliados
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-32 p-0 m-4">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((otherCompany) => (
              <div
                key={otherCompany.id}
                className="bg-bg-gray shadow-lg flex items-center transform transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={otherCompany.photoUrl}
                  alt={otherCompany.name}
                  className="w-36 h-36 object-cover ml-2 p-1"
                />
                <div className="p-4">
                  <h2 className="text-lg font-poppins">{otherCompany.name}</h2>
                  <p>Horario: 8:00 am a 10:00 pm</p>
                  <p className="text-black mt-2 font-poppins">
                    {otherCompany.schedule}
                  </p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className="w-5 h-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 15.27L16.18 19 14.54 12.97 20 8.24l-8.19-.69L10 2 8.19 7.55 0 8.24l5.46 4.73L3.82 19z" />
                      </svg>
                    ))}
                  </div>
                  <Link to={`/companydetails/${otherCompany.id}`}>
                    <button className="mt-4 bg-[#00A082] text-white px-16 py-1.5 rounded-3xl hover:bg-blue-600 font-oleo">
                      Ver más
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No hay otras empresas disponibles.</p>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CompanyDetails;
