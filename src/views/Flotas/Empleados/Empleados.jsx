import React, { useState, useEffect } from 'react';
import {
  Grid
} from 'material-ui';
import axios from '../../../http-common'
import {
  RegularCard, Table, ItemGrid
} from 'components';
import {Button, Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import * as empleadoService from "../../../services/empleadoService";
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
import EmpleadoForm from './EmpleadoForm.jsx';

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
  { id: 'iTypeDescripcion', label: 'Tipo ID' },
  { id: 'personIdentification', label: 'ID' },
  { id: 'personName', label: 'Nombre' },
  { id: 'userEmail', label: 'Usuario' },
  { id: 'rolDescripcion', label: 'Rol' },
  { id: 'personPhone', label: 'Teléfono' },
  { id: 'actions', label: 'Acción', disableSorting: true }
]
const Empleado = () => {
    
    // Busqueda de información principal
    const [datalist, setData] = useState([]);
    useEffect(() => {
        axios.get('Person/Getperson?id=0')
        .then((response) => {
        let data = response.data.dataList
        setData(data)
        setRecords(data)
        })
    }, [setData]);

    console.log(datalist)
    //console.log(records)
    const classes = useStyles();
    //Estados para enviar la información que se va a editar
    const [recordForEdit, setRecordForEdit] = useState(null)
    // Estados de los registos
    const [records, setRecords] = useState(datalist)
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
    const addOrEdit = (datalist1, resetForm) => {
       console.log(datalist1)
        if(datalist1.personId == 0){
          console.log(datalist1)
          empleadoService.insertEmpleado(datalist1)
        }
        else{ 
          console.log(datalist1)
          empleadoService.editEmpleado(datalist1)
        }
        resetForm()
        setOpenPopup(false)
        setRecords(datalist)
    }
    //Abrir el popup
    const openInPopup = item => {
       console.log(item)
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    //FUNCIONES PARA ELIMINAR
    const DeleteRegister = item => {
        empleadoService.deleteEmpleado(item.personIdentification)
            // Eliminar el registro de la lista
            const updatedData = datalist.filter(a => a.id !== item.id);;
            setData(updatedData);
            // Actualizar la lista de registros que se muestra en la tabla
            setRecords(updatedData);
    }

    const AlertDelete = item => {
        swal({
            title: "Eliminar",
            text: "¿Estás seguro que deseas eliminar este archivo?",
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
              title="Empleados"
              subTitle="OMSAPP"
              icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
          />
          <Paper className={classes.pageContent}>

              <Toolbar>
                  <Controls.Input
                      label="Buscar empleado"
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
                            : (item.personName+' '+item.personLastname).toLowerCase().includes(searchText.toLocaleLowerCase())
                          }).map(item =>
                              (<TableRow style={{color:'black'}} key={item.id}>
                                 <TableCell style={{color:'black'}}>{item.iTypeDescripcion}</TableCell>
                                 <TableCell style={{color:'black'}}>{item.personIdentification}</TableCell>
                                  <TableCell style={{color:'black'}}>{item.personName+' '+item.personLastname}</TableCell>
                                  <TableCell style={{color:'black'}}>{item.userEmail}</TableCell>
                                  <TableCell style={{color:'black'}}>{item.rolDescripcion}</TableCell>
                                  <TableCell style={{color:'black'}}>{item.personPhone}</TableCell>
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
              title="Crear empleado"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
          >
              <EmpleadoForm
                  recordForEdit={recordForEdit}
                  addOrEdit={addOrEdit} />
          </Popup>
      </React.Fragment>
  )
}

export default Empleado;