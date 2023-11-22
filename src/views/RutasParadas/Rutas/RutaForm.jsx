import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/useForm';
import axios from '../../../http-common'

const initialFValues = {
  bRouteDescription: "",
  bRouteInitialStop: 0,
  bRouteFinishStop: 0
}

export default function RutaForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('bRouteDescription' in fieldValues)
            temp.bRouteDescription = fieldValues.bRouteDescription ? "" : "This field is required."
        if ('bRouteInitialStop' in fieldValues)
            temp.bRouteInitialStop = fieldValues.bRouteInitialStop ? "" : "This field is required."
        if ('bRouteFinishStop' in fieldValues)
            temp.bRouteFinishStop = fieldValues.bRouteFinishStop ? "" : "This field is required."      
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
    const [busStop, setBusStop] = useState([]);
    useEffect(() => {
        axios.get('BusStop/GetSimple?id=0')
        .then((response) => {
        let data = response.data.dataList
        setBusStop(data)
        })
    }, []);

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                <Controls.Input
                        name="bRouteDescription"
                        label="Ruta"
                        value={values.bRouteDescription}
                        onChange={handleInputChange}
                        error={errors.bRouteDescription}
                    />
                <Controls.Select
                        name="bRouteInitialStop"
                        label="Parada inicial"
                        value={values.bRouteInitialStop}
                        onChange={handleInputChange}
                        options={busStop}
                        error={errors.bRouteInitialStop}
                    /> 
                </Grid>
                <Grid item xs={6}>
                <Controls.Select
                        name="bRouteFinishStop"
                        label="Parada final"
                        value={values.bRouteFinishStop}
                        onChange={handleInputChange}
                        options={busStop}
                        error={errors.bRouteFinishStop}
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
