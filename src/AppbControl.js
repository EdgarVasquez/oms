import React, { useState, useEffect, useContext } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import Maps from '../src/views/Maps/Maps';
import { decryptData } from './services/Criptography'
import { UserContext } from "./usercontext";
const Chat = () => {
  const [connection, setConnection] = useState(null);
  const [markerCoordinates, setMarkerCoordinates] = useState([]);
  const { user, user2 } = useContext(UserContext); // Accede a las propiedades del contexto
  const updateMarkerPosition = (connectionId, lat, lng) => {
    setMarkerCoordinates((prevCoordinates) => {
      const updatedCoordinates = [...prevCoordinates];
      const existingCoordinateIndex = updatedCoordinates.findIndex(
        (coordinate) => coordinate.connectionId === connectionId
      );
      console.log(existingCoordinateIndex)
      if (existingCoordinateIndex !== -1) {
        // Si las coordenadas ya existen, actualiza sus valores
        updatedCoordinates[existingCoordinateIndex] = {
          connectionId,
          lat,
          lng,
        };
      } else {
        // Si las coordenadas no existen, crea un nuevo conjunto de coordenadas
        updatedCoordinates.push({ connectionId, lat, lng });
      }
        console.log(updatedCoordinates)
      return updatedCoordinates;
    });
  };

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://omsappapi.azurewebsites.net/Hubs/ChatHub')
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log('Conectado!');

          connection.on('ReceiveCoordinates', (coordinates) => {
          

        
            console.log("coordenadas ",coordinates.ConnectionId, decryptData(coordinates.latitude), decryptData(coordinates.longitude))
            if (decryptData(coordinates.RouteId) == decryptData(user2.routeId))
            {
                updateMarkerPosition(coordinates.ConnectionId, decryptData(coordinates.latitude), decryptData(coordinates.longitude));
    
            }
                   
          });
        })
        .catch((e) => console.log('Error de conexión: ', e));
    }
  }, [connection]);

  return (
    <div>
      <Maps markerCoordinates={markerCoordinates} />
    </div>
  );
};

export default Chat;
