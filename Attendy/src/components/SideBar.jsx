const SideBar = () => {
  return (
    <nav className="lg:flex fixed z-10 lg:w-[120px] lg:p-0 p-2 w-full lg:top-0 lg:left-0 bottom-0 lg:h-[100vh] lg:items-center lg:justify-center border-r-2 bg-[#00A082]">
      <div className="flex flex-col h-full justify-between p-5">
        <div className="flex flex-col justify-start gap-10 items-center">
          <div>
            <img
              className="w-[80px] h-[80px] mb-10"
              src="/icons/logoblanco.svg"
              alt="Logo"
            />
          </div>
          <div>
            <img
              className="w-[80px] h-[80px]"
              src="/icons/store.svg"
              alt="Logo"
            />
          </div>
          <div>
            <img
              className="w-[70px] h-[70px]"
              src="/icons/listProducts.svg"
              alt="Logo"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <img
            className="w-[80px] h-[80px]"
            src="/icons/perfil.svg"
            alt="Perfil"
          />
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
