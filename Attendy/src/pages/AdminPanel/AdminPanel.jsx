import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../Firebase/firebaseConfig";
import SideBar from "../../components/SideBar";

const AdminPanel = () => {
  const { user } = useSelector((store) => store.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState([]);

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
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
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
      <div className="flex-grow flex flex-col">
        <div className="bg-[#E1E1E1] lg:h-20 h-[70px] lg:p-6 p-6 flex justify-between items-center w-full">
          <p
            className={`text-[#00A082] lg:text-2xl font-poppins lg:ml-[230px] ml-12`}
          >
            Bienvenido, {user ? user.name : "Usuario"}
          </p>
          <button className="bg-[#00A082] text-white px-5 rounded-2xl flex items-center">
            <img
              className="lg:w-[3rem] w-[40px]"
              src="/icons/userBlanco.svg"
              alt=""
            />
            <span className="lg:block hidden">
              {user ? user.name : "Usuario"}
            </span>
          </button>
        </div>
        <div className="flex flex-col lg:ml-64 lg:mr-28 mt-10 w-4/5 m-auto gap-10">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="lg:text-[18px] text-[] font-bold mb-2">
                      Orden De {order.name}
                    </h3>
                    <p className="text-gray-700">
                      <span className="text-[#00A082] font-semibold">
                        Fecha:
                      </span>{" "}
                      {order.createdAt
                        ? order.createdAt.toDate().toLocaleDateString()
                        : "Fecha no disponible"}
                    </p>
                    <p className="text-gray-700">
                      <span className="text-[#00A082] font-semibold">
                        Dirección:
                      </span>{" "}
                      {order.address || "Sin dirección"}
                    </p>
                    <p className="text-gray-700">
                      <span className="text-[#00A082] font-semibold">
                        Celular:
                      </span>{" "}
                      {order.phoneNumber || "Sin número"}
                    </p>
                    <p className="text-gray-700">
                      <span className="text-[#00A082] font-semibold">
                        Descripcion:
                      </span>{" "}
                      {order.description || "Sin descripcion"}
                    </p>
                  </div>
                  <div>
                    <select
                      className="bg-bg-gray lg:px-4 py-2 rounded-md "
                      onChange={(e) =>
                        handleChangeStatus(order.id, e.target.value)
                      }
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

export default AdminPanel;
