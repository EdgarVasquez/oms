import React, { useState, useEffect, useRef } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import carritoIcon from '../../assets/img/bus.png';

const CustomSkinMap = withScriptjs(
  withGoogleMap((props) => {
    const [markers, setMarkers] = useState([]);
    const markerTimerRef = useRef(null);

    useEffect(() => {
      // Limpia el temporizador cuando se desmonta el componente
      return () => {
        clearTimeout(markerTimerRef.current);
      };
    }, []);

    useEffect(() => {
      if (props.markerCoordinates) {
        setMarkers((prevMarkers) => {
          const updatedMarkers = [...prevMarkers];

          // Filtra las coordenadas que han estado inactivas durante 4 segundos
          const currentTime = Date.now();
          updatedMarkers.forEach((marker, index) => {
            const lastUpdate = marker.lastUpdate || 0;
            if (currentTime - lastUpdate > 4000) {
              updatedMarkers.splice(index, 1); // Elimina el marcador
            }
          });

          // Agrega o actualiza los marcadores recibidos
          props.markerCoordinates.forEach((coord) => {
            const existingMarker = updatedMarkers.find(
              (marker) => marker.connectionId === coord.connectionId
            );

            if (existingMarker) {
              // Actualiza la última hora de actualización
              existingMarker.lastUpdate = currentTime;
              existingMarker.position = {
                lat: parseFloat(coord.lat),
                lng: parseFloat(coord.lng),
              };
            } else {
              // Crea un nuevo marcador
              updatedMarkers.push({
                position: {
                  lat: parseFloat(coord.lat),
                  lng: parseFloat(coord.lng),
                },
                connectionId: coord.connectionId,
                lastUpdate: currentTime,
              });
            }
          });

          return updatedMarkers;
        });
      }

      // Configura un temporizador para limpiar marcadores inactivos
      markerTimerRef.current = setTimeout(() => {
        setMarkers((prevMarkers) => {
          const currentTime = Date.now();
          const updatedMarkers = prevMarkers.filter(
            (marker) => currentTime - (marker.lastUpdate || 0) <= 4000
          );
          return updatedMarkers;
        });
      }, 6000); // Limpia los marcadores inactivos cada 5 segundos

    }, [props.markerCoordinates]);

    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: 18.4882, lng: -69.9499 }}
        defaultOptions={{
          scrollwheel: false,
          zoomControl: true,
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.connectionId}
            position={marker.position}
            icon={{
              url: carritoIcon,
              scaledSize: new window.google.maps.Size(32, 32),
            }}
          />
        ))}
      </GoogleMap>
    );
  })
);

const Maps = ({ markerCoordinates }) => {
  return (
    <CustomSkinMap
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAuCnmlP1dO9g9WtjlLzLaZdgaicIRgTe4"
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '100vh' }} />}
      mapElement={<div style={{ height: '100%' }} />}
      markerCoordinates={markerCoordinates}
    />
  );
};

export default Maps;
