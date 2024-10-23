import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { database } from "../../Firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import CompanyGrid from "../../components/CompanyGrid";
import Geolocalizacion from "../../components/Geolocalizacion";
import { ToastContainer } from "react-toastify";

const Search = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const query = useSelector((state) => state.search.query);

  useEffect(() => {
    const fetchCompanies = async () => {
      const companiesCollection = collection(database, "companies");
      const snapshot = await getDocs(companiesCollection);
      const companiesData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCompanies(companiesData);
      setFilteredCompanies(companiesData);
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCompanies(filtered);
  }, [query, companies]);

  return (
    <main className="flex flex-col min-h-screen lg:w-full font-poppins">
      <Header />
      <Geolocalizacion />
      <div className="lg:w-full w-4/5 m-auto">
        <div className="flex items-center justify-center">
          <img
            className="w-full lg:max-w-[35%] h-auto m-4 mt-7"
            src="/public/images/motico.png"
            alt="OrderImage"
          />
        </div>
        <h1 className="text-2xl sm:text-4xl text-[#00A082] py-4 font-oleo text-center">
          Nuestros aliados
        </h1>
        <SearchBar />
        <div className="container lg:w-[70%] mx-auto p-4">
          <CompanyGrid companies={filteredCompanies} />
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </main>
  );
};

export default Search;
