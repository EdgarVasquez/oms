import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/useForm';
import axios from '../../../http-common'

const initialFValues = {
  routeId: 0,
  scheduleId: 0,
  routeScheduleCondition: true
}

export default function AsignacionHorariosForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('routeId' in fieldValues)
            temp.routeId = fieldValues.routeId ? "" : "This field is required."
        if ('scheduleId' in fieldValues)
            temp.scheduleId = fieldValues.scheduleId ? "" : "This field is required."      
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
    const [busRoute, setBusRoute] = useState([]);
    useEffect(() => {
        axios.get('BusRoute?id=0')
        .then((response) => {
        let data = response.data.dataList
        setBusRoute(data)
        })
    }, []);
    const [schedule, setSchedule] = useState([]);
    useEffect(() => {
        axios.get('Schedule/Getschedule/0')
        .then((response) => {
        let data = response.data.dataList
        setSchedule(data)
        })
    }, []);

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                <Controls.Select
                        name="routeId"
                        label="Ruta"
                        value={values.routeId}
                        onChange={handleInputChange}
                        options={busRoute}
                        error={errors.routeId}
                    /> 
                </Grid>
                <Grid item xs={6}>
                <Controls.Select
                        name="scheduleId"
                        label="Horario"
                        value={values.scheduleId}
                        onChange={handleInputChange}
                        options={schedule}
                        error={errors.scheduleId}
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
