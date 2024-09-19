import React, { useEffect, useState } from 'react';

// Simulación de la función con datos quemados
const fetchCompanies = async () => {
  // Aquí va la llamada a database
  return [
    {
      id: 1,
      name: 'Hormiguitas',
      photo: 'https://img.freepik.com/vector-premium/caricatura-divertido-hormiga-ondulacion-blanco-plano-fondo_70172-1497.jpg',
      rating: 4,
      hours: 'Lunes a Viernes, 9:00 AM - 5:00 PM',
    },
    {
      id: 1,
      name: 'Hormiguitas',
      photo: 'https://img.freepik.com/vector-premium/caricatura-divertido-hormiga-ondulacion-blanco-plano-fondo_70172-1497.jpg',
      rating: 4,
      hours: 'Lunes a Viernes, 9:00 AM - 5:00 PM',
    },
    {
      id: 1,
      name: 'Hormiguitas',
      photo: 'https://img.freepik.com/vector-premium/caricatura-divertido-hormiga-ondulacion-blanco-plano-fondo_70172-1497.jpg',
      rating: 4,
      hours: 'Lunes a Viernes, 9:00 AM - 5:00 PM',
    },
    {
      id: 1,
      name: 'Hormiguitas',
      photo: 'https://img.freepik.com/vector-premium/caricatura-divertido-hormiga-ondulacion-blanco-plano-fondo_70172-1497.jpg',
      rating: 4,
      hours: 'Lunes a Viernes, 9:00 AM - 5:00 PM',
    },
    {
      id: 1,
      name: 'Hormiguitas',
      photo: 'https://img.freepik.com/vector-premium/caricatura-divertido-hormiga-ondulacion-blanco-plano-fondo_70172-1497.jpg',
      rating: 4,
      hours: 'Lunes a Viernes, 9:00 AM - 5:00 PM',
    },
    {
      id: 1,
      name: 'Hormiguitas',
      photo: 'https://img.freepik.com/vector-premium/caricatura-divertido-hormiga-ondulacion-blanco-plano-fondo_70172-1497.jpg',
      rating: 4,
      hours: 'Lunes a Viernes, 9:00 AM - 5:00 PM',
    },
  
  ];
};

const CompanyGrid = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      const data = await fetchCompanies();
      setCompanies(data);
    };
    getCompanies();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 p-6">
  {companies.map((company) => (
    <div key={company.id} className="bg-bg-gray shadow-lg flex max-w-xl mx-auto items-center p-4 transform transition-transform duration-300 hover:scale-105">
      <img src={company.photo} alt={company.name} className="w-40 h-40 object-cover ml-2" /> 
      <div className="p-4">
        <h2 className="text-lg font-poppins">{company.name}</h2>
        <p className="text-black mt-2 font-poppins">{company.hours}</p>
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-5 h-5 ${index < company.rating ? 'text-yellow-500' : 'text-gray-300'}`}
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