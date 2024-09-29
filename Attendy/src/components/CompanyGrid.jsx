import { Link } from "react-router-dom";

const CompanyGrid = ({ companies }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 p-6 mb-7">
      {companies.map((company) => (
        <div
          key={company.id}
          className="bg-bg-gray shadow-lg flex max-w-xl mx-auto items-center p-4 transform transition-transform duration-300 hover:scale-105 w-[80%] rounded-2xl"
        >
          <img
            src={company.photoUrl}
            alt={company.name}
            className="w-40 h-40 object-cover ml-2 mr-10 rounded-2xl"
          />
          <div className="p-4 item flex flex-col">
            <h2 className="text-[30px] font-oleo">{company.name}</h2>
            <p className="text-black mt-2 font-poppins">8:00 am a 10:00 pm</p>
            <div className="flex items-center mt-1">
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
            <Link to={`/companydetails/${company.id}`}>
              <button className="mt-4 bg-[#00A082] text-white px-16 py-1.5 rounded-3xl hover:text-black font-oleo">
                Ver más
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyGrid;
