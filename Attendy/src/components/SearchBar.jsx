import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/search/searchSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);
  console.log("Current search query:", query);

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    dispatch(setSearchQuery(newQuery));
  };

  return (
    <div className="flex justify-center my-3">
      <div className="relative w-[760px]">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Buscar empresa"
          className="w-full h-[50px] pl-12 pr-16 border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-bg-gray text-xl font-poppins placeholder:text-[#3C3C3C] relative"
        />
        <span className="absolute inset-y-0 right-7 flex items-center pr-4 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 26 26"
            className="text-[#3C3C3C]"
          >
            <path
              fill="currentColor"
              d="M10 .188A9.812 9.812 0 0 0 .187 10A9.812 9.812 0 0 0 10 19.813c2.29 0 4.393-.811 6.063-2.125l.875.875a1.845 1.845 0 0 0 .343 2.156l4.594 4.625c.713.714 1.88.714 2.594 0l.875-.875a1.84 1.84 0 0 0 0-2.594l-4.625-4.594a1.824 1.824 0 0 0-2.157-.312l-.875-.875A9.812 9.812 0 0 0 10 .188zM10 2a8 8 0 1 1 0 16a8 8 0 0 1 0-16zM4.937 7.469a5.446 5.446 0 0 0-.812 2.875a5.46 5.46 0 0 0 5.469 5.469a5.516 5.516 0 0 0 3.156-1a7.166 7.166 0 0 1-.75.03a7.045 7.045 0 0 1-7.063-7.062c0-.104-.005-.208 0-.312z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
