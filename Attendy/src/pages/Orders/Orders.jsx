import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
  setDoc
} from "firebase/firestore";
import { database } from "../../Firebase/firebaseConfig";
import SideBar from "../../components/SideBar";
import RatingModal from "../../components/RatingModal";

const Orders = () => {
  const { user } = useSelector((store) => store.auth);
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
            const orderData = orderDoc.data();
            ordersArray.push({
              id: orderDoc.id,
              ...orderData,
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

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };
  const handleRate = async (rating) => {
    if (!selectedOrder) return;

  const ratingsRef = collection(database, `companies/${selectedOrder.companyId}/orders/${selectedOrder.id}/ratings`);
  const newRatingRef = doc(ratingsRef);

  try {
    await setDoc(newRatingRef, { rating, userId: user.id });
    console.log(`Calificación guardada para ${selectedOrder.companyName}: ${rating}`);
  } catch (error) {
    console.error("Error al guardar la calificación", error);
  }
  setModalOpen(false);
};
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-grow flex flex-col lg:ml-16">
        <div className="bg-[#E1E1E1] w-full lg:h-20 h-[70px] lg:p-6 flex justify-between items-center ">
          <p className="text-[#00A082] lg:text-2xl font-poppins lg:ml-[230px] ml-20">
            Tus órdenes
          </p>
          <button className="bg-[#00A082] text-white px-5 rounded-2xl flex items-center mr-5">
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
        <div className="flex flex-col lg:ml-64 lg:mr-28 mt-10 w-4/5 m-auto gap-10 font-poppins">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Pedidos:</h3>
          </div>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer"
                onClick={() => handleOrderClick(order)}
              >
                <div className="flex justify-between items-center mb-2">
                  <p>
                    <span className="text-[#00A082] font-semibold">
                      Estado:
                    </span>{" "}
                    {order.status || "Sin estado"}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">
                    <span className="text-[#00A082] font-semibold">
                      Servicio solictado a:{" "}
                    </span>
                    {order.companyName || "Sin empresa asociada"}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">
                    <span className="text-[#00A082] font-semibold">
                      Fecha:{" "}
                    </span>
                    {order.createdAt
                      ? order.createdAt.toDate().toLocaleDateString()
                      : "Fecha no disponible"}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">
                    <span className="text-[#00A082] font-semibold">
                      Dirección:
                    </span>{" "}
                    {order.address || "Sin dirección"}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">
                    <span className="text-[#00A082] font-semibold">
                      Celular:
                    </span>{" "}
                    {order.phoneNumber || "Sin número"}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">
                    <span className="text-[#00A082] font-semibold">
                      Descripción:
                    </span>{" "}
                    {order.description || "Sin descripción"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No tienes órdenes disponibles.</p>
          )}
        </div>
      </div>
      <RatingModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onRate={handleRate}
      />
    </div>
  );
};

export default Orders;
