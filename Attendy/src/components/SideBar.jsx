const SideBar = () => {
  return (
    <nav className="lg:flex fixed z-10 lg:w-[120px] lg:p-0 p-2 w-full lg:top-0 lg:left-0 bottom-0 lg:h-[100vh]lg:items-center lg:justify-center border-r-2 bg-[#00A082]">
      <div className="flex flex-col justify-between p-5">
        <div>
          <img
            className="w-[80px] h-[80px]"
            src="/icons/logoBlanco.svg"
            alt="Logo"
          />
        </div>
        <div>
          <img
            className="w-[80px] h-[80px]"
            src="/icons/perfil.svg"
            alt="Logo"
          />
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
