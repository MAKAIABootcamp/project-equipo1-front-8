import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../Firebase/firebaseConfig";

const AverageRatings = ({ companyId }) => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        console.log(`Obteniendo ratings para empresa ID: ${companyId}`);
        const ratingsRef = collection(database, `companies/${companyId}/ratings`);
        const ratingsSnapshot = await getDocs(ratingsRef);

        if (ratingsSnapshot.empty) {
          console.log("No se encontraron calificaciones para esta empresa."); 
          return;
        }

        console.log(`Ratings Snapshot:`, ratingsSnapshot.docs);
        let totalRating = 0;
        let count = 0;

        ratingsSnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(`Datos de la calificación ${doc.id}:`, data);
          if (data.rating) {
            totalRating += data.rating;
            count++;
          }
        });

        if (count === 0) {
          console.log("No hay calificaciones válidas.");
        }

        const average = count > 0 ? totalRating / count : 0;
        console.log(`Total: ${totalRating}, Conteo: ${count}, Promedio: ${average}`);
        console.log(`Promedio para la empresa ${companyId}: ${average}`);
        setAverageRating(average);
      } catch (error) {
        console.error("Error al obtener las calificaciones:", error);
      }
    };

    fetchRatings();
  }, [companyId]);

  const renderStars = (rating) => (
    <div className="flex items-center mt-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${index < Math.round(rating) ? "text-yellow-500" : "text-gray-300"}`}
          fill={index < Math.round(rating) ? "currentColor" : "none"}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 15.27L16.18 19 14.54 12.97 20 8.24l-8.19-.69L10 2 8.19 7.55 0 8.24l5.46 4.73L3.82 19z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div>
      {renderStars(averageRating)}
    </div>
  );
};

export default AverageRatings;