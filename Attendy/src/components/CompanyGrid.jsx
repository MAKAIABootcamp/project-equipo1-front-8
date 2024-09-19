import React, { useEffect, useState } from 'react';
import { database } from '../Firebase/firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';

const CompanyGrid = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const companyRef = collection(database, "companies");
      const resp = await getDocs(companyRef);
      const companiesData = resp.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCompanies(companiesData);
    };

    fetchCompanies();
  }, []); 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 p-6">
      {companies.map((company) => (
        <div key={company.id} className="bg-bg-gray shadow-lg flex max-w-xl mx-auto items-center p-4 transform transition-transform duration-300 hover:scale-105">
          <img src={company.photo} alt={company.name} className="w-40 h-40 object-cover ml-2" />
          <div className="p-4">
            <h2 className="text-lg font-poppins">{company.companyName}</h2>
            <p className="text-black mt-2 font-poppins">8:00 am a 10:00 pm</p>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={'w-5 h-5 text-yellow-500'}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 15.27L16.18 19 14.54 12.97 20 8.24l-8.19-.69L10 2 8.19 7.55 0 8.24l5.46 4.73L3.82 19z" />
                </svg>
              ))}
            </div>
            <button className="mt-4 bg-[#00A082] text-white px-16 py-1.5 rounded-3xl hover:bg-blue-600 font-oleo">
              Ver más
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyGrid;
