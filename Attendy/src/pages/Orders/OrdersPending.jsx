import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { database } from "../../Firebase/firebaseConfig"; 
import SideBar from "../../components/SideBar";

const OrdersPending = () => {
  const { user } = useSelector((store) => store.auth);
  const [orders, setOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      if (!user) {
        console.log("No hay usuario autenticado.");
        return;
      }

      try {
        const ordersArray = [];
        const ordersQuery = query(
          collection(database, `companies/${user.id}/orders`),
          where("status", "==", "pending") 
        );

        const ordersSnapshot = await getDocs(ordersQuery);
        ordersSnapshot.forEach((orderDoc) => {
          ordersArray.push({
            id: orderDoc.id,
            ...orderDoc.data(),
          });
        });

        setOrders(ordersArray);
      } catch (error) {
        console.error("Error al obtener las órdenes pendientes:", error);
      }
    };

    fetchPendingOrders();
  }, [user]);

  const handleChangeStatus = async (orderId, newStatus) => {
    const orderRef = doc(database, `companies/${user.id}/orders`, orderId);
    try {
      if (newStatus === "Entregado") {
        await deleteDoc(orderRef);
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      } else {
        await updateDoc(orderRef, { status: newStatus });
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error al actualizar el estado de la orden:", error);
    }
  };

  return (
    <div className="flex">
      <SideBar isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
      <div
        className={`flex-grow flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-[130px]" : "translate-x-0"}`}
      >
        <div className="bg-[#E1E1E1] h-20 p-6 flex justify-between items-center">
          <p className="text-[#00A082] text-2xl font-poppins ml-60">Órdenes pendientes</p>
          <button className="bg-[#00A082] text-white px-5 rounded-2xl flex items-center">
            <img className="w-[3rem]" src="/icons/userBlanco.svg" alt="" />
            {user && user.name ? user.name : "Nombre de usuario"}
          </button>
        </div>
        <div className="flex-grow ml-64 mr-28 mt-10">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="bg-white border border-gray-300 rounded-lg shadow-md p-4 mb-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-2">Orden De {order.name}</h3>
                    <p className="text-gray-700">
                      Fecha:{" "}
                      {order.createdAt
                        ? order.createdAt.toDate().toLocaleDateString()
                        : "Fecha no disponible"}
                    </p>
                    <p className="text-gray-700">Dirección: {order.address || "Sin dirección"}</p>
                    <p className="text-gray-700">Celular: {order.phoneNumber || "Sin número"}</p>
                    <p className="text-gray-700">Descripcion: {order.description || "Sin descripcion"}</p>
                  </div>
                  <div>
                    <select 
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                      onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                    >
                      <option value="">Actualizar estado</option>
                      <option value="Confirmado">Confirmado</option>
                      <option value="En camino">En camino</option>
                      <option value="Entregado">Entregado</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No hay órdenes pendientes.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPending;
