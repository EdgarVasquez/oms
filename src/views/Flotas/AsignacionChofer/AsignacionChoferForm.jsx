import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/useForm';
import * as asignacionChoferService from "../../../services/asignacionChoferService";
import axios from '../../../http-common'


const initialFValues = {
    id: 0,
    busId: '',
    identificacionPersonal: '',
    assignmentStartDate: new Date(),
    assignmentFinishDate: new Date(),
    assignmentStartTime: '',
    assignmentFinishTime: '',
    assignment_condition: true,
}

export default function AsignacionChoferForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('bus_id' in fieldValues)
            temp.bus_id = fieldValues.bus_id ? "" : "This field is required."
        if ('person_identification' in fieldValues)
            temp.person_identification = fieldValues.person_identification ? "" : "This field is required."
        if ('assignment_start_date' in fieldValues)
            temp.assignment_start_date = fieldValues.assignment_start_date ? "" : "This field is required."
        if ('assignment_finish_date' in fieldValues)
            temp.assignment_finish_date = fieldValues.assignment_finish_date ? "" : "This field is required."
        if ('assignment_start_time' in fieldValues)
            temp.assignment_start_time = fieldValues.assignment_start_time ? "" : "This field is required."
        if ('assignment_finish_time' in fieldValues)
            temp.assignment_finish_time = fieldValues.assignment_finish_time ? "" : "This field is required."
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
    const [driver, setDriver] = useState([]);
    useEffect(() => {
        axios.get('Person/GetDriver?id=0')
        .then((response) => {
        let data = response.data.dataList
        setDriver(data)
        })
    }, []);

    const [bus, setBus] = useState([]);
    useEffect(() => {
        axios.get('Bus/Getbus/0')
        .then((response) => {
        let data = response.data.dataList
        setBus(data)
        })
    }, []);
    console.log(values)
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                <Controls.Select
                        name="busId"
                        label="Bus"
                        value={values.busId}
                        onChange={handleInputChange}
                        options={bus}
                        error={errors.busId}
                    />
                    <Controls.DatePicker
                        name="assignmentStartDate"
                        label="Fecha inicio"
                        value={values.assignmentStartDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="assignmentStartTime"
                        label="Hora inicio"
                        value={values.assignmentStartTime}
                        onChange={handleInputChange}
                        error={errors.assignmentStartTime}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="identificacionPersonal"
                        label="Chofer"
                        value={values.identificacionPersonal}
                        onChange={handleInputChange}
                        options={driver}
                        error={errors.identificacionPersonal}
                    />
                    <Controls.DatePicker
                        name="assignmentFinishDate"
                        label="Fecha fin"
                        value={values.assignmentFinishDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="assignmentFinishTime"
                        label="Hora Fin"
                        value={values.assignmentFinishTime}
                        onChange={handleInputChange}
                        error={errors.assignmentFinishTime}
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
