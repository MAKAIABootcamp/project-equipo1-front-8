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

  if (!company)
    return (
      <div>
        <div>
          <div className="w-full absolute py-8 text-center">
            <h2 className=" text-[2rem] text-[#00A082]">Loading</h2>
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-300 fill-[#00A082]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      </div>
    );

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
      <div className="p-9 m-14 rounded-2xl bg-bg-gray">
        <h1 className="text-3xl font-oleo mb-2 flex justify-center">
          {company.name}
        </h1>
        <div className="flex lg:flex-row flex-col items-center justify-center m-5">
          <img
            src={company.photoUrl}
            className="w-40 h-40 lg:mr-5 rounded-2xl lg:mb-0 mb-5"
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
        <div className="flex flex-col items-center ">
          <p className="lg:m-10 font-poppins lg:text-justify text-center text-wrap lg:text-[25px] text-[15px]">
            {company.description}
          </p>
          <div className="flex justify-center pt-5 text-[20px]">
            <button
              className="mt-4 py-2 px-4 font-semibold rounded-[30px] w-[200px] transition-all duration-300 bg-bg-gray text-[#00A082] hover:bg-[#00A082] hover:text-white border-[1px] border-[#00A082]"
              onClick={() => handleOrder(company.id)}
            >
              Hacer Pedido
            </button>
          </div>
        </div>
      </div>
      <div className="p-1 m-11">
        <h1 className="text-4xl font-oleo mb-5 flex justify-center">
          Más aliados
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10 p-6 mb-7 text-center">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((otherCompany) => (
              <div
                key={otherCompany.id}
                className="bg-bg-gray shadow-lg flex lg:flex-row flex-col max-w-xl mx-auto items-center p-4 transform transition-transform duration-300 hover:scale-105 w-full rounded-2xl pt-10"
              >
                <img
                  src={otherCompany.photoUrl}
                  alt={otherCompany.name}
                  className="w-40 h-40 object-cover lg:ml-2 lg:mr-10 rounded-2xl"
                />
                <div className="p-4 flex flex-col">
                  <h2 className="text-[30px] lg:text-start text-center font-oleo">
                    {otherCompany.name}
                  </h2>
                  <p className="text-black mt-2 font-poppins">
                    Horario: 8:00 am a 10:00 pm
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
                    <button className="mt-4 py-2 px-4 font-semibold rounded-[30px] w-[200px] transition-all duration-300 bg-bg-gray text-[#00A082] hover:bg-[#00A082] hover:text-white border-[1px] border-[#00A082]">
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
