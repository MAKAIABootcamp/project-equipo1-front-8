import SideBar from "../../components/SideBar";

const OrdersPending = () => {
    return (
        <div className="flex">
            <SideBar />
            <div className="flex-grow flex flex-col">
                <div className="bg-[#E1E1E1] h-20 p-6 flex justify-between items-center">
                    <p className="text-[#00A082] text-2xl font-poppins ml-44">
                        Ordenes pendientes
                    </p>
                    <button className="bg-[#00A082] text-white px-5 rounded-2xl flex items-center">
                        <img className="w-[3rem]" src="/icons/userBlanco.svg" alt="" />
                        Pepito Perez
                    </button>
                </div>
                <div className="flex-grow ml-36 mt-10">
                    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 mb-4">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-lg font-bold mb-2">Orden 1</h3>
                                <p className="text-gray-700">dd/mm/aaaa</p>
                                <p className="text-gray-700">Usuario: Pepito Perez</p>
                                <p className="text-gray-700">
                                    Dirección: Cra 9#40-90 La Victoria
                                </p>
                                <p className="text-gray-700">Celular: 3210987654</p>
                            </div>
                            <div>
                                <select className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">
                                    <option>Actualizar estado</option>
                                    <option>Confirmado</option>
                                    <option>En camino</option>
                                    <option>Entregado</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 mb-4">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-lg font-bold mb-2">Orden 2</h3>
                                <p className="text-gray-700">dd/mm/aaaa</p>
                                <p className="text-gray-700">Usuario: Pepito Perez</p>
                                <p className="text-gray-700">
                                    Dirección: Cra 9#40-90 La Victoria
                                </p>
                                <p className="text-gray-700">Celular: 3210987654</p>
                            </div>
                            <div>
                                <select className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">
                                    <option>Actualizar estado</option>
                                    <option>Confirmado</option>
                                    <option>En camino</option>
                                    <option>Entregado</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 mb-4">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-lg font-bold mb-2">Orden 3</h3>
                                <p className="text-gray-700">dd/mm/aaaa</p>
                                <p className="text-gray-700">Usuario: Pepito Perez</p>
                                <p className="text-gray-700">
                                    Dirección: Cra 9#40-90 La Victoria
                                </p>
                                <p className="text-gray-700">Celular: 3210987654</p>
                            </div>
                            <div>
                                <select className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">
                                    <option>Actualizar estado</option>
                                    <option>Confirmado</option>
                                    <option>En camino</option>
                                    <option>Entregado</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersPending;
