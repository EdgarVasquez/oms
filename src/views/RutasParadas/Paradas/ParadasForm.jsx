import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/useForm';
import axios from '../../../http-common'

const initialFValues = {
  tittle: "",
  bStopLatitude: "",
  bStopLongitude: "",
  bRouteId: 0,
  stypeId: 0,
  bStopCondition: true
}

export default function ParadasForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('tittle' in fieldValues)
            temp.tittle = fieldValues.tittle ? "" : "This field is required."
        if ('bStopLatitude' in fieldValues)
            temp.bStopLatitude = fieldValues.bStopLatitude ? "" : "This field is required."
        if ('bStopLongitude' in fieldValues)
            temp.bStopLongitude = fieldValues.bStopLongitude ? "" : "This field is required."  
        if ('bRouteId' in fieldValues)
            temp.bRouteId = fieldValues.bRouteId ? "" : "This field is required."  
        if ('stypeId' in fieldValues)
            temp.stypeId = fieldValues.stypeId ? "" : "This field is required."      
            setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        console.log(recordForEdit)
        if (recordForEdit != null)
            setValues(recordForEdit)
    }, [recordForEdit])

   //METODOS GET 
   const [route, setRoute] = useState([]);
   useEffect(() => {
       axios.get('BusRoute?id=0')
       .then((response) => {
       let data = response.data.dataList
       setRoute(data)
       })
   }, []);
    const [type, setBusType] = useState([]);
    useEffect(() => {
        axios.get('StopType/Getstoptype/0')
        .then((response) => {
        let data = response.data.dataList
        setBusType(data)
        })
    }, []);

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                <Controls.Input
                        name="tittle"
                        label="Parada"
                        value={values.tittle}
                        onChange={handleInputChange}
                        error={errors.tittle}
                    />
                     <Controls.Input
                        name="bStopLatitude"
                        label="Latitud"
                        value={values.bStopLatitude}
                        onChange={handleInputChange}
                        error={errors.bStopLatitude}
                    />
                     <Controls.Input
                        name="bStopLongitude"
                        label="Longitud"
                        value={values.bStopLongitude}
                        onChange={handleInputChange}
                        error={errors.bStopLongitude}
                    />
                </Grid>
                <Grid item xs={6}>
                <Controls.Select
                        name="bRouteId"
                        label="Ruta"
                        value={values.bRouteId}
                        onChange={handleInputChange}
                        options={route}
                        error={errors.bRouteId}
                    />
                 <Controls.Select
                        name="stypeId"
                        label="Tipo"
                        value={values.stypeId}
                        onChange={handleInputChange}
                        options={type}
                        error={errors.stypeId}
                    /> 
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Enviar" />
                        <Controls.Button
                            text="Resetear"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
