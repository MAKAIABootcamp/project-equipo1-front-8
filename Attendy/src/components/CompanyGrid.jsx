import { Link } from "react-router-dom";
import AverageRatings from "./AverageRatings";

const CompanyGrid = ({ companies }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10 p-6 mb-7">
      {companies.map((company) => (
        <div
          key={company.id}
          className="bg-bg-gray shadow-lg flex lg:flex-row flex-col max-w-xl w-full marker:mx-auto items-center p-4 transform transition-transform duration-300 hover:scale-105 rounded-2xl"
        >
          <img
            src={company.photoUrl}
            alt={company.name}
            className="w-40 h-40 object-cover lg:ml-2 lg:mr-10 rounded-2xl mt-3"
          />
          <div className="p-4 item flex flex-col">
            <h2 className="text-[30px] text-center lg:text-start font-oleo">
              {company.name}
            </h2>
            <p className="text-black mt-2 font-poppins">
              Horario: 8:00 am a 10:00 pm
            </p>
            <div className="flex items-center mt-1">
              <AverageRatings/>
              </div>
            <Link to={`/companydetails/${company.id}`}>
              <button className="mt-4 py-2 px-4 font-semibold rounded-[30px] w-[200px] transition-all duration-300 bg-bg-gray text-[#00A082] hover:bg-[#00A082] hover:text-white border-[1px] border-[#00A082]">
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