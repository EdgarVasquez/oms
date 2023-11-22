import React, { useState, useEffect } from 'react';
import {
  Grid
} from 'material-ui';
import axios from '../../../http-common'
import {
  RegularCard, Table, ItemGrid
} from 'components';
import AsignacionChoferForm from './AsignacionChoferForm';
import {Button, Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import * as asignacionChoferService from "../../../services/asignacionChoferService";
import useTable from "../../../components/useTable";
import PageHeader from "../../../components/PopUp/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import Controls from "../../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../../components/PopUp/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import swal from 'sweetalert';


//ESTILOS
const useStyles = makeStyles(theme => ({
  pageContent: {
      //margin: theme.spacing(5),
      padding: theme.spacing(3)
  },
  searchInput: {
    width: '75%'
  },
  newButton: {
      position: 'absolute',
      right: '7px'
  }
}))

const headCells = [
  { id: 'identificacionPersonal', label: 'ID' },
  { id: 'nombre', label: 'Nombre' },
  { id: 'busId', label: 'Bus' },
  { id: 'placa', label: 'Placa' },
  { id: 'assignmentStartDate', label: 'Inicio' },
  { id: 'assignmentFinishDate', label: 'Fin' },
  { id: 'actions', label: 'Acción', disableSorting: true }
]
const AsignacionChofer = () => {
    
    // Busqueda de información principal
    const [asignacion, setAsignacion] = useState([]);
    useEffect(() => {
        axios.get('Assignment/Getassignment?id=0')
        .then((response) => {
        let data = response.data.dataList
        setAsignacion(data)
        setRecords(data)
        })
    }, [setAsignacion]);

    console.log(asignacion)
    console.log(records)
    const classes = useStyles();
    //Estados para enviar la información que se va a editar
    const [recordForEdit, setRecordForEdit] = useState(null)
    // Estados de los registos
    const [records, setRecords] = useState(asignacion)
    console.log(records)
    // Estados del popup
    const [openPopup, setOpenPopup] = useState(false)
    // Estados de busquedas
    const [searchText, setSearchText] = useState('');
    // Constantes de tablas
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    //Añadir y editar registros
    const addOrEdit = (asignacionchofer, resetForm) => {
        if(asignacionchofer.id == 0){
            asignacionChoferService.insertAsignacion(asignacionchofer)
        }
        else{
            asignacionChoferService.editAsignacion(asignacionchofer)
        }
        resetForm()
        setOpenPopup(false)
        setRecords(asignacion)
    }
    //Abrir el popup
    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    //FUNCIONES PARA ELIMINAR
    const DeleteRegister = item => {
        asignacionChoferService.deleteAsignacion(item.id)
            // Eliminar el registro de la lista de asignaciones
            const updatedAsignacion = asignacion.filter(a => a.id !== item.id);;
            setAsignacion(updatedAsignacion);
            // Actualizar la lista de registros que se muestra en la tabla
            setRecords(updatedAsignacion);
    }

    const AlertDelete = item => {
        swal({
            title: "Eliminar",
            text: "¿Estás seguro que deseas eliminar este registro?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(respuesta =>{
            if(respuesta){
                DeleteRegister(item);
            }
        })
    }
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }
    // Renderiza el componente
    return (
      <React.Fragment>
          <PageHeader
              title="Asignaciones"
              subTitle="OMSAPP"
              icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
          />
          <Paper className={classes.pageContent}>

              <Toolbar>
                  <Controls.Input
                      label="Buscar asignaciones"
                      className={classes.searchInput}
                      InputProps={{
                          startAdornment: (<InputAdornment position="start">
                              <Search/>
                          </InputAdornment>)
                      }}
                      onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Controls.Button
                      text="Agregar"
                      variant="outlined"
                      startIcon={<AddIcon />}
                      className={classes.newButton}
                      onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                  />
              </Toolbar>
              <TblContainer>
                  <TblHead />
                  <TableBody>
                      {
                          recordsAfterPagingAndSorting().filter((item) =>{
                            return searchText.toLowerCase() === '' 
                            ? item
                            : item.nombre.toLowerCase().includes(searchText.toLowerCase())
                          }).map(item =>
                              (<TableRow style={{color:'black'}} key={item.id}>
                                 <TableCell style={{color:'black'}}>{item.identificacionPersonal}</TableCell>
                                 <TableCell style={{color:'black'}}>{item.nombre}</TableCell>
                                  <TableCell style={{color:'black'}}>{item.busId}</TableCell>
                                  <TableCell style={{color:'black'}}>{item.placa}</TableCell>
                                  <TableCell style={{color:'black'}}>{item.inicioJornada}</TableCell>
                                  <TableCell style={{color:'black'}}>{item.finJornada}</TableCell>
                                  <TableCell>
                                      <Controls.ActionButton
                                          color="primary"
                                          onClick={() => { openInPopup(item) }}>
                                          <EditOutlinedIcon fontSize="small" />
                                      </Controls.ActionButton>
                                      <Controls.ActionButton
                                          color="second"
                                          onClick={() => {AlertDelete(item)}}>
                                          <CloseIcon fontSize="small" />
                                      </Controls.ActionButton>
                                  </TableCell>
                              </TableRow>)
                          )
                      }
                  </TableBody>
              </TblContainer>
              <TblPagination />
          </Paper>
          <Popup
              title="Asignar autobús"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
          >
              <AsignacionChoferForm
                  recordForEdit={recordForEdit}
                  addOrEdit={addOrEdit} />
          </Popup>
      </React.Fragment>
  )
}

export default AsignacionChofer;