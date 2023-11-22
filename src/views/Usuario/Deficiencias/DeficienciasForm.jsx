import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/useForm';
import axios from '../../../http-common'

const initialFValues = {
  wDaySubject: "",
  wDayEmail: "",
  statusId: 0,
  statusId: 0
}

export default function DeficienciasForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('wDaySubject' in fieldValues)
            temp.wDaySubject = fieldValues.wDaySubject ? "" : "This field is required."
        if ('wDayEmail' in fieldValues)
            temp.wDayEmail = fieldValues.wDayEmail ? "" : "This field is required."
        if ('wDayDescription' in fieldValues)
            temp.wDayDescription = fieldValues.wDayDescription ? "" : "This field is required." 
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
    const [status, setStatus] = useState([]);
    useEffect(() => {
        axios.get('BusReportStatus/Getbusreportstatu/0')
        .then((response) => {
        let data = response.data.dataList
        setStatus(data)
        })
    }, []);

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                <Controls.Input
                        name="wDayEmail"
                        label="Correo electrónico"
                        value={values.wDayEmail}
                        onChange={handleInputChange}
                        error={errors.wDayEmail}
                    />
                <Controls.Input
                        name="wDaySubject"
                        label="Asunto"
                        value={values.wDaySubject}
                        onChange={handleInputChange}
                        error={errors.wDaySubject}
                    />
                </Grid>
                <Grid item xs={6}>
                <Controls.Input
                        name="wDayDescription"
                        label="Descripción"
                        value={values.wDayDescription}
                        onChange={handleInputChange}
                        error={errors.wDayDescription}
                    />
                <Controls.Select
                        name="statusId"
                        label="Estatus"
                        value={values.statusId}
                        onChange={handleInputChange}
                        options={status}
                        error={errors.statusId}
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
