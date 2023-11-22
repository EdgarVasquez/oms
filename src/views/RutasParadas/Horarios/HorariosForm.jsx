import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/useForm';
import axios from '../../../http-common'

const initialFValues = {
    scheduleStartTime: "",
    scheduleFinishTime: "",
    scheduleModay: false,
    scheduleTuesday: false,
    scheduleWednesday: false,
    scheduleThursday: false,
    scheduleFriday: false,
    scheduleSaturday: false,
    scheduleSunday: false,
    scheduleCondition: true
}

export default function HorariosForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('scheduleStartTime' in fieldValues)
            temp.scheduleStartTime = fieldValues.scheduleStartTime ? "" : "This field is required."
        if ('scheduleFinishTime' in fieldValues)
            temp.scheduleFinishTime = fieldValues.scheduleFinishTime ? "" : "This field is required."      
   
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

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                <Controls.Input
                        name="scheduleStartTime"
                        label="Hora inicio"
                        value={values.scheduleStartTime}
                        onChange={handleInputChange}
                        error={errors.scheduleStartTime}
                />
                <Controls.Input
                        name="scheduleFinishTime"
                        label="Hora fin"
                        value={values.scheduleFinishTime}
                        onChange={handleInputChange}
                        error={errors.scheduleFinishTime}
                />
                </Grid>
                <Grid item xs={6}>
                <Controls.Checkbox
                        name="scheduleModay"
                        label="Lunes"
                        value={values.scheduleModay}
                        onChange={handleInputChange}
                />
                 <Controls.Checkbox
                        name="scheduleTuesday"
                        label="Martes"
                        value={values.scheduleTuesday}
                        onChange={handleInputChange}
                />
                 <Controls.Checkbox
                        name="scheduleWednesday"
                        label="Miercoles"
                        value={values.scheduleWednesday}
                        onChange={handleInputChange}
                />
                 <Controls.Checkbox
                        name="scheduleThursday"
                        label="Jueves"
                        value={values.scheduleThursday}
                        onChange={handleInputChange}
                />
                <Controls.Checkbox
                        name="scheduleFriday"
                        label="Viernes"
                        value={values.scheduleFriday}
                        onChange={handleInputChange}
                />
                 <Controls.Checkbox
                        name="scheduleSaturday"
                        label="Sábado"
                        value={values.scheduleSaturday}
                        onChange={handleInputChange}
                />
                 <Controls.Checkbox
                        name="scheduleSunday"
                        label="Domingo"
                        value={values.scheduleSunday}
                        onChange={handleInputChange}
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
