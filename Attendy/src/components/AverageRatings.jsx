import { useEffect, useState } from "react";
import { database } from "../Firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import PropTypes from "prop-types";

const AverageRatings = ({ companyId }) => {
  const [average, setAverage] = useState(0);

  useEffect(() => {
    const fetchAverageRating = async () => {
      const ratingsRef = collection(database, "ratings");
      const q = query(ratingsRef, where("companyId", "==", companyId));
      const querySnapshot = await getDocs(q);
      const ratings = querySnapshot.docs.map((doc) => doc.data().rating);

      if (ratings.length > 0) {
        const avg =
          ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
        setAverage(avg.toFixed(1));
      }
    };

    fetchAverageRating();
  }, [companyId]);

  const renderStars = () => {
    const fullStars = Math.floor(average);
    const halfStar = average % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <span key={`full-${index}`} className="text-yellow-500 text-2xl">
            ★
          </span>
        ))}
        {halfStar === 1 && (
          <span className="relative text-2xl">
            <span className="text-yellow-400 absolute left-0 w-1/2 overflow-hidden">
              ★
            </span>
            <span className="text-gray-400 absolute left-0 w-1/2">★</span>
          </span>
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className="text-gray-400 text-2xl">
            ★
          </span>
        ))}
      </div>
    );
  };

  return <div>{renderStars()}</div>;
};

AverageRatings.propTypes = {
  companyId: PropTypes.isRequired,
};

export default AverageRatings;
