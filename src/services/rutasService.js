import React, { useState, useEffect } from 'react';
import axios from '../http-common';
import swal from 'sweetalert';

export function insertRuta(data) {
  try {
    const response = axios.post(
      'BusRoute/SetBusRoute',
      data
    );
    swal("¡Procesado con éxito!", "OMSAPP", "success");
  } catch (error) {
    swal("Error al agregar el registro", "OMSAPP", "Error");
    console.error('Error al enviar la solicitud:', error);
  }
}

export function editRuta(data) {
  try {
    const response = axios.post(
      'BusRoute/SetBusRoute',
      data
    );
    console.log(data)
    swal("¡Procesado con éxito!", "OMSAPP", "success");
  } catch (error) {
    swal("Error al editar el registro", "OMSAPP", "Error");
    console.error('Error al enviar la solicitud:', error);
  }
}

export function deleteRuta(id) {
  try {
    const response = axios.delete(
      `BusRoute/${id}`
    );
    swal("¡Procesado con éxito!", "OMSAPP", "success");
  } catch (error) {
    swal("Error al eliminar el registro", "OMSAPP", "Error");
    console.error('Error al enviar la solicitud:', error);
  }
}