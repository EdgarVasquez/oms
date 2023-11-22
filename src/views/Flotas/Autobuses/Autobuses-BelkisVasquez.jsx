import React, { useState, useEffect } from 'react';
import {
  Grid
} from 'material-ui';
import axios from '../../../http-common'
import {
  RegularCard, Table, ItemGrid
} from 'components';
import AutobusForm from './AutobusForm';
import {Button, Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import * as autobusesService from "../../../services/autobusesService";
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
    { id: 'id', label: 'ID' },
    { id: 'tittle', label: 'Nombre' },
    { id: 'busLicensePlate', label: 'Placa' },
    { id: 'modelId', label: 'Modelo' },
    { id: 'brandDescription', label: 'Marca' },
    { id: 'busPassengerNumber', label: 'Pasajeros' },
    { id: 'routeId', label: 'Ruta asignada'},
    { id: 'statusId', label: 'Estatus'},
    { id: 'actions', label: 'Acción', disableSorting: true }
  ]
  
  
const Autobuses = () => {
    
    // Busqueda de información principal
    const [autobus, setAutobus] = useState([]);
    useEffect(() => {
        axios.get('Bus/Getbus/0')
        .then((response) => {
        let data = response.data.dataList
        setAutobus(data)
        setRecords(data)
        })
    }, [setAutobus]);

    const classes = useStyles();
    //Estados para enviar la información que se va a editar
    const [recordForEdit, setRecordForEdit] = useState(null)
    // Estados de los registos
    const [records, setRecords] = useState(autobus)
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
    const addOrEdit = (autobus, resetForm) => {
        if(autobus.id == 0){
            autobusesService.insert(autobus)
        }
        else{
            autobusesService.edit(autobus)
        }
        resetForm()
        setOpenPopup(false)
        setRecords(autobus)
    }
    //Abrir el popup
    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    //FUNCIONES PARA ELIMINAR
    const DeleteRegister = item => {
        autobusesService.deleteMethod(item.id)
            // Eliminar el registro de la lista de autobus
            const updatedAutobus = autobus.filter(a => a.id !== item.id);;
            setAutobus(updatedAutobus);
            // Actualizar la lista de registros que se muestra en la tabla
            setRecords(updatedAutobus);
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
    console.log(recordsAfterPagingAndSorting())
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
                      label="Buscar autobus"
                      className={classes.searchInput}
                      InputProps={{
                          startAdornment: (<InputAdornment position="start">
                              <Search/>
                          </InputAdornment>)
                      }}
                      onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Controls.Button
                      text="Add New"
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
                          recordsAfterPagingAndSorting().filter((itemFiltered) =>{
                            return searchText.toLowerCase() === '' 
                            ? itemFiltered
                            : itemFiltered.nombre.toLowerCase().includes(searchText)
                          }).map(item =>
                              (<TableRow style={{color:'black'}} key={item.id}>
                                 <TableCell style={{color:'black'}}>{item.id}</TableCell>
                                 <TableCell style={{color:'black'}}>{item.tittle}</TableCell>
                                 <TableCell style={{color:'black'}}>{item.busLicensePlate}</TableCell>
                                  <TableCell style={{color:'black'}}>{item.modelDescription}</TableCell>
                                  <TableCell style={{color:'black'}}>{item.brandDescription}</TableCell>
                                  <TableCell style={{color:'black'}}>{item.busPassengerNumber}</TableCell>
                                  <TableCell style={{color:'black'}}>{item.bRouteDescription}</TableCell>
                                  <TableCell style={{color:'black'}}>{item.brStatusDescripcion}</TableCell>
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
              <AutobusForm
                  recordForEdit={recordForEdit}
                  addOrEdit={addOrEdit} />
          </Popup>
      </React.Fragment>
  )
}

export default Autobuses;