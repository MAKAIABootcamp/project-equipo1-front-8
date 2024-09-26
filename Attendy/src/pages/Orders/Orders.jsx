import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../Firebase/firebaseConfig";
import SideBar from "../../components/SideBar";

const Orders = () => {
  const { user } = useSelector((store) => store.auth);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        console.log("No hay usuario autenticado.");
        return;
      }

      try {
        const ordersArray = [];

        const companiesSnapshot = await getDocs(
          collection(database, "companies")
        );

        for (const companyDoc of companiesSnapshot.docs) {
          const ordersQuery = query(
            collection(database, `companies/${companyDoc.id}/orders`),
            where("name", "==", user.name)
          );

          const ordersSnapshot = await getDocs(ordersQuery);

          ordersSnapshot.forEach((orderDoc) => {
            ordersArray.push({
              id: orderDoc.id,
              ...orderDoc.data(),
              companyId: companyDoc.id,
              companyName: companyDoc.data().name,
            });
          });
        }

        setOrders(ordersArray);
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="flex">
      <SideBar />
      <div className={`flex-grow flex flex-col ml-16`}>
        <div className="bg-[#E1E1E1] h-20 p-6 flex justify-between items-center">
          <p className="text-[#00A082] text-2xl font-poppins ml-44">
            Tus órdenes
          </p>
          <button className="bg-[#00A082] text-white px-5 rounded-2xl flex items-center">
            <img className="w-[3rem]" src="/icons/userBlanco.svg" alt="" />
            {user && user.name ? user.name : "Nombre de usuario"}
          </button>
        </div>
        <div className="flex-grow ml-24 p-24">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Pedidos:</h3>
          </div>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md p-4 mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">
                    Estado:{" "}
                    {order.createdAt
                      ? order.createdAt.toDate().toLocaleDateString()
                      : "Fecha no disponible"}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">
                    Dirección: {order.address || "Sin direccion"}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">
                    Celular: {order.phoneNumber || "Sin numero"}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">
                    Description: {order.description || "Sin description"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No tienes órdenes disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
