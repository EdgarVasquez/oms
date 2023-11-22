import React, { useState, useEffect } from 'react';
import {
  Grid
} from 'material-ui';
import axios from '../../../http-common'
import {
  RegularCard, Table, ItemGrid
} from 'components';
import ModalInsertar from './modalInsertar';
import {Button} from '@material-ui/core';

const Chofer = () => {

    const [chofer, setChofer] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    
    const abrirCerrarModalInsertar=() =>{
      setModalInsertar(!modalInsertar);
    }

    useEffect(async() => {
      await axios.get('/Person/GetDriver?id=0')
      .then(response =>{
        let data = response.data.dataList
        const arrayOfArrays = data.map(obj  => Object.values(obj));
        setChofer(arrayOfArrays)
      })
    },[])
    // Renderiza el componente
    return (
      <Grid container>
              <div className='Modal'>
                <br/>
                <Button onClick={abrirCerrarModalInsertar}>Insertar</Button>
              </div>
              {/* Renderiza el ModalInsertar solo si modalInsertar es true */}
              {modalInsertar && (
                <ModalInsertar
                  open={modalInsertar}
                  onClose={abrirCerrarModalInsertar}
                  onInsert={(data) => {
                    // Lógica para insertar los datos aquí
                    console.log('Datos a insertar:', data);
                    // Cierra el modal de inserción
                    abrirCerrarModalInsertar();
                  }}
                />
              )}
                <ItemGrid xs={12} sm={12} md={12}>
                {/* Botón para abrir el modal */}
                    <RegularCard
                        headerColor="blueGreen"
                        cardTitle="GESTIÓN DE CHOFERES"
                        cardSubtitle="Gestión de choferes"
                        content={
                          
                            <Table
                                tableHeaderColor="lightBlue"
                                tableHead={['Tipo Documento','Documento','Nombre','Licencia','Teléfono','Dirección', 'Condición', 'Acción' ]}
                                tableData={chofer}
                            />
                        }
                    />
                </ItemGrid>
            </Grid>
    );
}

export default Chofer;