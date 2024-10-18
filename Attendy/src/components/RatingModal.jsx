import React, { useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";
import { database } from "../Firebase/firebaseConfig";

const RatingModal = ({ isOpen, onClose, companyId }) => {
  const [rating, setRating] = React.useState(0);
  const [feedbackMessage, setFeedbackMessage] = React.useState('');

  useEffect(() => {
    if (isOpen) {
      setRating(0);
      setFeedbackMessage('');
    }
  }, [isOpen]);

  const handleRate = async () => {
    console.log("Intentando guardar la calificación:", rating);
    try {
      const ratingsRef = doc(
        database,
        `companies/${companyId}/ratings/${Date.now()}`
      );
      await setDoc(ratingsRef, { rating });
      setFeedbackMessage('Calificación guardada con éxito');
      setTimeout(() => {
        onClose();
      }, 1500);
      // onClose();
    } catch (error) {
      console.error("Error al guardar la calificación:", error);
      setFeedbackMessage('Error al guardar la calificación');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4">
        <h2 className="text-lg font-bold mb-4">Califica la empresa </h2>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`text-2xl ${
                rating >= star ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>
        {feedbackMessage && <p className="mt-8 text-[#00A082] font-semibold">{feedbackMessage}</p>}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleRate}
            className="px-4 py-2 bg-[#00A082] text-white rounded"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;

