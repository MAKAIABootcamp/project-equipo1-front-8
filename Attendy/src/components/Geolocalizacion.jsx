import React, { useEffect, useState } from "react";
import axios from "axios";

const Geolocalizacion = () => {
  const [ubicacion, setUbicacion] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "AIzaSyD2EwFdFxAVgJsMEtHrDjM19fGSkdRlPkg";

  useEffect(() => {
    const obtenerUbicacion = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;

            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitud},${longitud}&key=${API_KEY}`
            );
            if (response.data.results.length > 0) {
              const datosUbicacion =
                response.data.results[0].address_components;
              setUbicacion(datosUbicacion);
            } else {
              setError("No se pudo obtener la dirección");
            }
          },
          (error) => {
            setError("Error al obtener la ubicación: " + error.message);
          }
        );
      } else {
        setError("La geolocalización no está soportada en este navegador.");
      }
    };

    obtenerUbicacion();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {ubicacion ? (
        <div>
          <h3>Ubicación:</h3>
          <ul>
            {ubicacion.map((componente, index) => (
              <li key={index}>
                {componente.long_name} ({componente.types.join(", ")})
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Obteniendo ubicación...</p>
      )}
    </div>
  );
};

export default Geolocalizacion;
