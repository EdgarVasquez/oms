import React, { useState, useEffect } from 'react';
import axios from '../http-common';
import swal from 'sweetalert';

export function insertEmpleado(data) {
  try {
    const response = axios.post(
      'Person/SetEmpleado',
      data
    );
    console.log(data)
    swal("¡Procesado con éxito!", "OMSAPP", "success");
  } catch (error) {
    swal("Error al agregar el registro", "OMSAPP", "Error");
    console.error('Error al enviar la solicitud:', error);
  }
}

export function editEmpleado(data) {
  try {
    const response = axios.post(
      'Person/SetEmpleado',
      data
    );
    console.log(data)
    swal("¡Procesado con éxito!", "OMSAPP", "success");
  } catch (error) {
    swal("Error al editar el registro", "OMSAPP", "Error");
    console.error('Error al enviar la solicitud:', error);
  }
}

export function deleteEmpleado(id) {
  try {
    const response = axios.delete(
      `Person/DeleteDriver/${id}`
    );
    swal("¡Procesado con éxito!", "OMSAPP", "success");
  } catch (error) {
    swal("Error al eliminar el registro", "OMSAPP", "Error");
    console.error('Error al enviar la solicitud:', error);
  }
}