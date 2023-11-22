import React, { useState, useEffect } from 'react';
import axios from '../http-common';
import swal from 'sweetalert';

export function insertAsignacion(data) {
  try {
    const response = axios.post(
      'Assignment/SetAssignment',
      data
    );
    swal("¡Procesado con éxito!", "OMSAPP", "success");
  } catch (error) {
    swal("Error al agregar el registro", "OMSAPP", "Error");
    console.error('Error al enviar la solicitud:', error);
  }
}

export function editAsignacion(data) {
  try {
    const response = axios.post(
      'Assignment/SetAssignment',
      data
    );
    swal("¡Procesado con éxito!", "OMSAPP", "success");
  } catch (error) {
    swal("Error al editar el registro", "OMSAPP", "Error");
    console.error('Error al enviar la solicitud:', error);
  }
}

export function deleteAsignacion(id) {
  try {
    const response = axios.delete(
      `Assignment/${id}`
    );
    swal("¡Procesado con éxito!", "OMSAPP", "success");
  } catch (error) {
    swal("Error al eliminar el registro", "OMSAPP", "Error");
    console.error('Error al enviar la solicitud:', error);
  }
}