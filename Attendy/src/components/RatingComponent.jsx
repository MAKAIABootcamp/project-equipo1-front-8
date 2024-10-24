import { useState, useEffect } from "react";
import { database } from "../Firebase/firebaseConfig";
import {
  collection,
  setDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import PropTypes from "prop-types";

const RatingComponent = ({ companyId, userId }) => {
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchRating = async () => {
      console.log("Fetching rating...");

      if (!userId || !companyId) {
        console.log("Error: userId or companyId is undefined.");
        return;
      }
      setHasRated(false);

      const ratingsRef = collection(database, "ratings");
      const q = query(
        ratingsRef,
        where("userId", "==", userId),
        where("companyId", "==", companyId)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userRating = querySnapshot.docs[0].data().rating;
        setRating(userRating);
        setHasRated(true);
      } else {
        console.log("No previous rating found.");
      }
    };

    fetchRating();
  }, [userId, companyId]);

  const handleRating = async (value) => {
    if (!userId || !companyId) {
      alert("Error: Debes estar autenticado para calificar.");
      return;
    }

    if (hasRated) {
      alert("Ya has puntuado esta empresa.");
      return;
    }

    try {
      const ratingsRef = doc(database, "ratings", `${userId}_${companyId}`);
      await setDoc(ratingsRef, {
        userId,
        companyId,
        rating: value,
      });
      setRating(value);
      setHasRated(true);
      setAlertMessage("¡Gracias por tu puntuación!");
      console.log("Rating saved successfully.");
    } catch (error) {
      console.error("Error al añadir la calificación:", error);
      setAlertMessage("Error al guardar la puntuación. Intenta de nuevo.");
    }
  };

  return (
    <div>
      <h3 className="text-[#00A082] font-semibold">Califica esta empresa:</h3>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleRating(star)}
          style={{
            cursor: "pointer",
            color: star <= rating ? "#FFD700" : "#A1A1AA",
            fontSize: "24px",
          }}
        >
          ★
        </span>
      ))}
      {hasRated && <p>{alertMessage}</p>}
    </div>
  );
};

RatingComponent.propTypes = {
  companyId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default RatingComponent;
