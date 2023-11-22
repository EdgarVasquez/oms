import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/useForm';
import axios from '../../../http-common'


const initialFValues = {
  id: 0,
  tittle: "",
  busPassengerNumber: 0,
  modelId: 0,
  busLicensePlate: "",
  routeId: 0,
  statusId: 0,
  organizationId: "",
  busCondition: true
}

export default function AutobusForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('tittle' in fieldValues)
            temp.tittle = fieldValues.tittle ? "" : "This field is required."
        if ('busPassengerNumber' in fieldValues)
            temp.busPassengerNumber = fieldValues.busPassengerNumber ? "" : "This field is required."
        if ('modelId' in fieldValues)
            temp.modelId = fieldValues.modelId ? "" : "This field is required."
        if ('busLicensePlate' in fieldValues)
            temp.busLicensePlate = fieldValues.busLicensePlate ? "" : "This field is required."
        if ('routeId' in fieldValues)
            temp.routeId = fieldValues.routeId ? "" : "This field is required."
        if ('statusId' in fieldValues)
            temp.statusId = fieldValues.statusId ? "" : "This field is required."

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
    const [model, setModel] = useState([]);
    useEffect(() => {
        axios.get('Model/Getmodel/0')
        .then((response) => {
        let data = response.data.dataList
        setModel(data)
        })
    }, []);

    const [route, setRoute] = useState([]);
    useEffect(() => {
        axios.get('BusRoute?id=0')
        .then((response) => {
        let data = response.data.dataList
        setRoute(data)
        })
    }, []);

    const [estatus, setEstatus] = useState([]);
    useEffect(() => {
        axios.get('BusReportStatus?id=0')
        .then((response) => {
        let data = response.data.dataList
        setEstatus(data)
        })
    }, []);

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="tittle"
                        label="Nombre"
                        value={values.tittle}
                        onChange={handleInputChange}
                        error={errors.tittle}
                    />
                    <Controls.Input
                        name="busLicensePlate"
                        label="Placa"
                        value={values.busLicensePlate}
                        onChange={handleInputChange}
                        error={errors.busLicensePlate}
                    />
                    <Controls.Input
                        name="busPassengerNumber"
                        label="Pasajeros"
                        value={values.busPassengerNumber}
                        onChange={handleInputChange}
                        error={errors.busPassengerNumber}
                    />
                           
                </Grid>
                <Grid item xs={6}>
                   <Controls.Select
                        name="routeId"
                        label="Ruta"
                        value={values.routeId}
                        onChange={handleInputChange}
                        options={route}
                        error={errors.routeId}
                    />
                    <Controls.Select
                        name="statusId"
                        label="Estatus"
                        value={values.statusId}
                        onChange={handleInputChange}
                        options={estatus}
                        error={errors.statusId}
                    />
                    <Controls.Select
                        name="modelId"
                        label="Modelo"
                        value={values.modelId}
                        onChange={handleInputChange}
                        options={model}
                        error={errors.modelId}
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
