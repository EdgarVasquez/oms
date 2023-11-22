import React, { useState, useEffect } from 'react';
import {
  Grid
} from 'material-ui';
import axios from '../../../http-common.js'
import {
  RegularCard, Table, ItemGrid
} from 'components';
import {Button, Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import * as empleadoService from "../../../services/empleadoService.js";
import useTable from "../../../components/useTable.jsx";
import PageHeader from "../../../components/PopUp/PageHeader.jsx";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import Controls from "../../../components/controls/Controls.jsx";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../../components/PopUp/Popup.jsx";
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
  searchReport: {
    width: '35%',
    paddingRight: '0px' // Ajusta el valor de espacio a la derecha según tus necesidades
  },   
  newButton: {
      position: 'absolute',
      right: '7px'
  }
}))

const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'identification', label: 'Identificación' },
  { id: 'personName', label: 'Nombre' },
  { id: 'personLastname', label: 'Apellido' },
  { id: 'workingDate', label: 'Fecha' },
  { id: 'workingTime', label: 'Hora' },
  { id: 'shiftStatus', label: 'Estatus' }
]
const ReporteEmpleadosDia = () => {
    function today() {
        const fechaHoy = new Date();
        const año = fechaHoy.getFullYear();
        const mes = (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
        const día = fechaHoy.getDate().toString().padStart(2, '0');
        const fechaNumerica = `${año}-${mes}-${día}`;
        return fechaNumerica;
      }

    // Busqueda de información principal
    const [datalist, setData] = useState([]);
    const [dayStart, setDayStart] = useState(today());
    const [dayFinish, setDayFinish] = useState(today()); 
    useEffect(() => {
        console.log(dayStart)
        console.log(dayFinish)
        axios.get(`WorkingDay/Getworkingday/0?dayStart=${dayStart}&dayFinish=${dayFinish}`)
        .then((response) => {
        let data = response.data.dataList
        setData(data)
        setRecords(data)
        })
    }, [setData,dayStart, dayFinish]);
    

    console.log(datalist)
    //console.log(records)
    const classes = useStyles();
    // Estados de los registos
    const [records, setRecords] = useState(datalist)
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
    console.log(dayStart)
    // Renderiza el componente
    return (
      <React.Fragment>
          <PageHeader
              title="Reporte de trabajo choferes"
              subTitle="OMSAPP"
              icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
          />
          <Paper className={classes.pageContent}>

              <Toolbar>
                  <Controls.Input
                      label="Nombre del empleado"
                      className={classes.searchReport}
                      InputProps={{
                          startAdornment: (<InputAdornment position="start">
                              <Search/>
                          </InputAdornment>)
                      }}
                      onChange={(e) => setSearchText(e.target.value)}
                  />
                    <Controls.DatePicker
                    name="dayStart"
                    label="Fecha de inicio"
                    value={dayStart}
                    onChange={(date) => {
                        // Obtén el año de la fecha seleccionado
                        setDayStart(date.target.value);
                    }}
                    />
                    <Controls.DatePicker
                        name="dayFinish"
                        label="Fecha de fin"  value={dayFinish}
                        onChange={(date) => setDayFinish(date.target.value)} 
                    />
              </Toolbar>
              <TblContainer>
                  <TblHead />
                  <TableBody>
                      {
                          recordsAfterPagingAndSorting().filter((item) =>{
                            return searchText.toLowerCase() === '' 
                            ? item
                            : item.personName.toLowerCase().includes(searchText.toLowerCase())
                          }).map(item =>
                              (<TableRow style={{color:'black'}} key={item.id}>
                                <TableCell style={{color:'black'}}>{item.id}</TableCell>
                                 <TableCell style={{color:'black'}}>{item.identification}</TableCell>
                                 <TableCell style={{color:'black'}}>{item.personName}</TableCell>
                                 <TableCell style={{color:'black'}}>{item.personLastname}</TableCell>
                                 <TableCell style={{color:'black'}}>{new Date(item.workingDate).toLocaleDateString()}</TableCell>
                                 <TableCell style={{color:'black'}}>{item.workingTime}</TableCell>
                                 <TableCell style={{ color: item.shiftStatus === 'Iniciado' ? 'green' : 'red' }}>
                                  {item.shiftStatus}
                                 </TableCell>

                              </TableRow>)
                          )
                      }
                  </TableBody>
              </TblContainer>
              <TblPagination />
          </Paper>
      </React.Fragment>
  )
}

export default ReporteEmpleadosDia;