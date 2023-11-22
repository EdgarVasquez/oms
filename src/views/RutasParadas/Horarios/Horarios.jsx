import React, { useState, useEffect } from 'react';
import {
  Grid
} from 'material-ui';
import axios from '../../../http-common'
import {
  RegularCard, Table, ItemGrid
} from 'components';
import HorariosForm from './HorariosForm';
import {Button, Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import * as horariosService from "../../../services/horariosService";
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
  { id: 'ID', label: 'ID' },
  { id: 'tittle', label: 'Horario' },
  { id: 'action', label: 'Acción' },
]
const Horario = () => {
    
    // Busqueda de información principal
    const [datalist, setData] = useState([]);
    useEffect(() => {
        axios.get('Schedule/Getschedule/0')
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
        if(datalist1.id === 0){
          console.log(datalist1)
          horariosService.insertHorarios(datalist1)
        }
        else{ 
          console.log(datalist1)
          horariosService.editHorarios(datalist1)
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
        horariosService.deleteHorarios(item.id)
            // Eliminar el registro de la lista
            const updatedData = datalist.filter(a => a.id !== item.id);;
            setData(updatedData);
            // Actualizar la lista de registros que se muestra en la tabla
            setRecords(updatedData);
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
                    return items.filter(x => x.tittle.toLowerCase().includes(target.value))
            }
        })
    }
    // Renderiza el componente
    return (
      <React.Fragment>
          <PageHeader
              title="Horarios"
              subTitle="OMSAPP"
              icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
          />
          <Paper className={classes.pageContent}>

              <Toolbar>
                  <Controls.Input
                      label="Buscar horarios"
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
                            : item.tittle.toLowerCase().includes(searchText.toLowerCase())
                          }).map(item =>
                              (<TableRow     key={item.id}>
                                 <TableCell >{item.id}</TableCell>
                                 <TableCell >{item.tittle}</TableCell>
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
              title="Crear Horario"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
          >
              <HorariosForm
                  recordForEdit={recordForEdit}
                  addOrEdit={addOrEdit} />
          </Popup>
      </React.Fragment>
  )
}

export default Horario;