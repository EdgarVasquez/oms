import React, { useState, useEffect } from 'react';
import axios from '../http-common';
import swal from 'sweetalert';

export function insertAutobuses(data) {
  try {
    const response = axios.post(
      'Bus/SetBus',
      data
    );
    swal("¡Procesado con éxito!", "OMSAPP", "success");
  } catch (error) {
    swal("Error al agregar el registro", "OMSAPP", "Error");
    console.error('Error al enviar la solicitud:', error);
  }
}

export function editAutobuses(data) {
  try {
    const response = axios.post(
      'Bus/SetBus',
      data
    );
    swal("¡Procesado con éxito!", "OMSAPP", "success");
  } catch (error) {
    swal("Error al editar el registro", "OMSAPP", "Error");
    console.error('Error al enviar la solicitud:', error);
  }
}

export function deleteAutobuses(id) {
  try {
    const response = axios.delete(
      `Bus/${id}`
    );
    swal("¡Procesado con éxito!", "OMSAPP", "success");
  } catch (error) {
    swal("Error al eliminar el registro", "OMSAPP", "Error");
    console.error('Error al enviar la solicitud:', error);
  }
}