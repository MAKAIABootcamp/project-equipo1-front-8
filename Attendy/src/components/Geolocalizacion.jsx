import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";  
import 'react-toastify/dist/ReactToastify.css'; 

const Geolocalizacion = () => {
  const API_KEY = "AIzaSyD2EwFdFxAVgJsMEtHrDjM19fGSkdRlPkg";

  useEffect(() => {
    const obtenerUbicacion = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;

            try {
              const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitud},${longitud}&key=${API_KEY}`
              );

              if (response.data.results.length > 0) {
                toast.success("Ubicación obtenida correctamente", {
                  autoClose: 1000,
                });
              }
            } catch (error) {
              console.error("Error al obtener la ubicación desde la API de Google:", error);
            }
          },
          (error) => {
            console.error("Error al obtener la ubicación:", error.message);
          }
        );
      } else {
        console.error("La geolocalización no está soportada en este navegador.");
      }
    };

    obtenerUbicacion();
  }, []);

  return null; 
};

export default Geolocalizacion;
