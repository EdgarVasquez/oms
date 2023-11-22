import React, { useState, useEffect } from 'react';
import axios from '../http-common';
import swal from 'sweetalert';

export function insertHorarios(data) {
  try {
    const response = axios.post(
      'Schedule/SetSchedule',
      data
    );
    swal("¡Procesado con éxito!", "OMSAPP", "success");
  } catch (error) {
    swal("Error al agregar el registro", "OMSAPP", "Error");
    console.error('Error al enviar la solicitud:', error);
  }
}

export function editHorarios(data) {
  try {
    const response = axios.post(
      'Schedule/SetSchedule',
      data
    );
    console.log(data)
    swal("¡Procesado con éxito!", "OMSAPP", "success");
  } catch (error) {
    swal("Error al editar el registro", "OMSAPP", "Error");
    console.error('Error al enviar la solicitud:', error);
  }
}

export function deleteHorarios(id) {
  try {
    const response = axios.delete(
      `Schedule/${id}`
    );
    swal("¡Procesado con éxito!", "OMSAPP", "success");
  } catch (error) {
    swal("Error al eliminar el registro", "OMSAPP", "Error");
    console.error('Error al enviar la solicitud:', error);
  }
}