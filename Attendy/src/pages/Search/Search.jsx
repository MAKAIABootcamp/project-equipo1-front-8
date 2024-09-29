import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { database } from "../../Firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import CompanyGrid from "../../components/CompanyGrid";

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
    <main>
      <Header />
      <div className="w-full flex items-center justify-center">
        <img
          className="w-[25%] h-auto object-contain"
          src="/public/images/delivery.png"
          alt="OrderImage"
        />
      </div>
      <h1 className="text-4xl text-[#00A082] py-4 font-oleo text-center p-0">
        Nuestros aliados
      </h1>
      <SearchBar />
      <div className="container mx-auto p-4">
        <CompanyGrid companies={filteredCompanies} />
      </div>
      <Footer />
    </main>
  );
};

export default Search;
