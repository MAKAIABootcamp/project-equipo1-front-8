import { doc, collection, addDoc } from "firebase/firestore";
import { database } from "../Firebase/firebaseConfig";

export const createOrder = async (companyId, orderData) => {
  try {
    const companyRef = doc(database, "companies", companyId);
    const ordersCollectionRef = collection(companyRef, "orders");
    const orderRef = await addDoc(ordersCollectionRef, orderData);

    console.log("Pedido creado con ID: ", orderRef.id);
  } catch (err) {
    console.error("Error al crear el pedido", err);
    throw err;
  }
};
