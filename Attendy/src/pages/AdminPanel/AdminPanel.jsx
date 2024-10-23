import { useEffect, useState } from "react";
import { writeBatch } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { database } from "../../Firebase/firebaseConfig";
import SideBar from "../../components/SideBar";
import { CiLogout } from "react-icons/ci";
import { logoutThunk } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate("/Login");
  };

  const handleLogout = () => {
    dispatch(logoutThunk()).then(() => {
      navigate("/");
    });
  };
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
      const orderSnapshot = await getDoc(orderRef);
      const orderData = orderSnapshot.data();
      if (newStatus === "Entregado") {
        const completedOrdersRef = collection(
          database,
          `companies/${user.id}/completedOrders`
        );
        await addDoc(completedOrdersRef, {
          ...orderData,
          completedAt: new Date(),
        });
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

  const fetchCompletedOrders = async () => {
    if (!user) return;
    try {
      const completedOrdersArray = [];
      const completedOrdersRef = collection(
        database,
        `companies/${user.id}/completedOrders`
      );
      const completedOrdersSnapshot = await getDocs(completedOrdersRef);
      completedOrdersSnapshot.forEach((doc) => {
        completedOrdersArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCompletedOrders(completedOrdersArray);
    } catch (error) {
      console.error("Error al obtener las órdenes completadas:", error);
    }
  };
  const handleClearHistory = async () => {
    try {
      const completedOrdersRef = collection(
        database,
        `companies/${user.id}/completedOrders`
      );
      const completedOrdersSnapshot = await getDocs(completedOrdersRef);
      const batch = writeBatch(database);
      completedOrdersSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      setCompletedOrders([]);
    } catch (err) {
      console.error("Error al limpiar el historial de órdenes:", err);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex-grow flex flex-col">
        <div className="flex bg-[#E1E1E1]">
          <SideBar isOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
          <div className=" lg:h-20 h-[70px] lg:p-6 p-6 flex justify-between items-center w-full">
            <p
              className={`text-[#00A082] lg:text-2xl font-poppins lg:ml-[230px] ml-12`}
            >
              Bienvenido, {user ? user.name : "Usuario"}
            </p>
            {/* <button className="bg-[#00A082] text-white px-5 rounded-2xl flex items-center">
              <img
                className="lg:w-[3rem] w-[40px]"
                src="/icons/userBlanco.svg"
                alt=""
              />
              <span className="lg:block hidden">
                {user ? user.name : "Usuario"}
              </span>
            </button> */}
            {isAuthenticated ? (
              <div className="flex items-center">
                <span className="text-[#00A082] font-poppins text-lg mr-4 text-end">
                  {/* {isMobile ? user.name.trim().split(/\s+/)[0] : user.name} */}
                </span>
                <button
                  className="bg-[#00A082] text-white px-5 p-2 rounded-2xl flex items-center"
                  onClick={handleLogout}
                >
                  <span className="hidden md:inline">Cerrar sesión</span>
                  <CiLogout className="w-5 h-5 md:hidden" />
                </button>
              </div>
            ) : (
              <button
                className="bg-[#00A082] text-white px-5 rounded-2xl flex items-center"
                onClick={handleClickLogin}
              >
                <img
                  className="w-[35px]"
                  src="/icons/userBlanco.svg"
                  alt="Login"
                />

                <span className="ml-2 hidden lg:block">
                  {user ? user.name : "Iniciar sesión"}
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-start lg:w-[73%] w-[80%] m-auto mt-5">
          <button
            onClick={() => {
              setShowModal(true);
              fetchCompletedOrders();
            }}
            className="bg-[#00A082] text-white rounded-[30px] px-5 py-2"
          >
            Ver historial de órdenes
          </button>
          {showModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center font-poppins">
              <div className="bg-white p-8 rounded-lg lg:w-[23%] w-[80%] max-h-[80vh] relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-4 text-[#00A082] text-3xl focus:outline-none"
                >
                  &times;
                </button>
                <h2 className="text-[25px] text-[#00A082] mb-4 text-center">
                  Historial de Órdenes Completadas
                </h2>
                <div className="overflow-y-auto max-h-[60vh] mb-10 scrollable">
                  {completedOrders.length > 0 ? (
                    completedOrders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-gray-100 p-4 mb-5 rounded-lg"
                      >
                        <h3 className="font-bold">{order.name}</h3>
                        <p>
                          Fecha:{" "}
                          {order.completedAt
                            ? order.completedAt.toDate().toLocaleDateString()
                            : "N/A"}
                        </p>
                        <p className="truncate">
                          Descripción: {order.description || "Sin descripción"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center mt-5">
                      No hay órdenes completadas.
                    </p>
                  )}
                </div>
                <div className="absolute bottom-4 right-4">
                  <button
                    onClick={handleClearHistory}
                    className=" text-[#00A082] rounded-lg py-2 w-[150px]"
                  >
                    Limpiar historial
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col lg:ml-64 lg:mr-28 mt-10 w-4/5 m-auto gap-10 mb-10 font-poppins">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
              >
                <div className="flex justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="lg:text-[18px] font-bold mb-2 ">
                        {/* Mostrar el nombre completo en pantallas grandes */}
                        <span className="hidden lg:block">{order.name}</span>
                        {/* Mostrar solo el primer nombre y el segundo apellido en móviles */}
                        <span className="block lg:hidden">
                          {order.name.split(" ").slice(0, 1).join(" ") +
                            " " +
                            order.name.split(" ")[2]}
                        </span>
                      </h3>
                      <div>
                        <select
                          className="bg-bg-gray lg:px-4 py-2 rounded-md text-[15px]"
                          onChange={(e) =>
                            handleChangeStatus(order.id, e.target.value)
                          }
                        >
                          <option value="">
                            <span>Actualizar estado</span>
                          </option>
                          <option value="Confirmado">Confirmado</option>
                          <option value="En camino">En camino</option>
                          <option value="Entregado">Entregado</option>
                        </select>
                      </div>
                    </div>
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
