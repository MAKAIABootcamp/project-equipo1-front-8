import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { database } from "../../Firebase/firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AverageRatings from "../../components/AverageRatings";
import RatingComponent from "../../components/RatingComponent";

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [otherCompanies, setOtherCompanies] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

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

  if (!company) {
    return (
      <div>
        <div className="w-full absolute py-8 text-center">
          <h2 className="text-[2rem] text-[#00A082]">Loading</h2>
        </div>
      </div>
    );
  }

  const filteredCompanies = otherCompanies.filter(
    (otherCompany) => otherCompany.id !== id
  );

  const handleOrder = (companyId) => {
    navigate("/services", { state: { companyId } });
    console.log("ID de la empresa:", companyId);
  };

  return (
    <main className="font-poppins">
      <Header />
      <div className="p-9 m-14 rounded-2xl bg-bg-gray">
        <h1 className="text-3xl font-oleo mb-2 flex justify-center text-center">
          {company.name}
        </h1>
        <div className="flex lg:flex-row flex-col items-center justify-center m-5">
          <img
            src={company.photoUrl}
            className="w-40 h-40 lg:mr-5 rounded-2xl lg:mb-0 mb-5"
            alt={company.name}
          />
          <div className="flex flex-col justify-center g:text-start text-center">
            <div className="flex flex-col font-poppins l">
              <div>
                <p>
                  <span className="text-[#00A082] font-semibold">
                    Telefono:
                  </span>{" "}
                </p>
                <p>{company.telefono}</p>
              </div>
              <div>
                <p>
                  <span className="text-[#00A082] font-semibold">
                    Dirección:
                  </span>{" "}
                </p>
                <p>{company.address}</p>
              </div>
              <div>
                <p>
                  <span className="text-[#00A082] font-semibold">Horario:</span>{" "}
                </p>
                <p>8:00 am a 10:00 pm</p>
              </div>
            </div>
            <div className="flex items-center mr-2">
              {userId && <RatingComponent companyId={id} userId={userId} />}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="lg:m-10 font-poppins lg:text-justify text-center text-wrap lg:text-[25px] text-[15px] break-words lg:max-w-[100%] max-w-[200px]">
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
                    <AverageRatings companyId={otherCompany.id} />
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
