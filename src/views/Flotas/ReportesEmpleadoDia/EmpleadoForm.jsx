import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/useForm';
import axios from '../../../http-common'

const initialFValues = {
  personId: 0,
  id: "",
  iType: 0,
  personName: "",
  personLastname: "",
  personAddress: "",
  personPhone: "",
  personDob: new Date(),
  personLicense: "",
  usersId: 0,
  condicion: true
}

export default function EmpleadoForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('id' in fieldValues)
            temp.id = fieldValues.id ? "" : "This field is required."
        if ('iType' in fieldValues)
            temp.iType = fieldValues.iType ? "" : "This field is required."
        if ('personName' in fieldValues)
            temp.personName = fieldValues.personName ? "" : "This field is required."
        if ('personLastname' in fieldValues)
            temp.personLastname = fieldValues.personLastname ? "" : "This field is required."
        if ('personAddress' in fieldValues)
            temp.personAddress = fieldValues.personAddress ? "" : "This field is required."
        if ('personPhone' in fieldValues)
            temp.personPhone = fieldValues.personPhone ? "" : "This field is required."
        if ('personDob' in fieldValues)
            temp.personDob = fieldValues.personDob ? "" : "This field is required."
        if ('personLicense' in fieldValues)
            temp.personLicense = fieldValues.personLicense ? "" : "This field is required."
        if ('usersId' in fieldValues)
            temp.usersId = fieldValues.usersId ? "" : "This field is required."
        
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
    const [identificationType, setIdentificationType] = useState([]);
    useEffect(() => {
        axios.get('IdentificationType/Getidentificationtype/0')
        .then((response) => {
        let data = response.data.dataList
        setIdentificationType(data)
        })
    }, []);

    const [user, setUser] = useState([]);
    useEffect(() => {
        axios.get('Users/Getuser/0')
        .then((response) => {
        let data = response.data.dataList
        setUser(data)
        })
    }, []);

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                <Controls.Select
                        name="iType"
                        label="Tipo de identificación"
                        value={values.iType}
                        onChange={handleInputChange}
                        options={identificationType}
                        error={errors.iType}
                    />
                    <Controls.Input
                        name="id"
                        label="Documento identificación"
                        value={values.id}
                        onChange={handleInputChange}
                        error={errors.id}
                    />
                    <Controls.Input
                        name="personName"
                        label="Nombre"
                        value={values.personName}
                        onChange={handleInputChange}
                        error={errors.personName}
                    />
                    <Controls.Input
                        name="personLastname"
                        label="Apellido"
                        value={values.personLastname}
                        onChange={handleInputChange}
                        error={errors.personLastname}
                    />
                    <Controls.Input
                        name="personAddress"
                        label="Dirección"
                        value={values.personAddress}
                        onChange={handleInputChange}
                        error={errors.personAddress}
                    />
                           
                </Grid>
                <Grid item xs={6}>
                <Controls.Input
                        name="personPhone"
                        label="Teléfono"
                        value={values.personPhone}
                        onChange={handleInputChange}
                        error={errors.personPhone}
                    />
                    <Controls.Input
                            name="personLicense"
                            label="Licencia"
                            value={values.personLicense}
                            onChange={handleInputChange}
                            error={errors.personLicense}
                    />
                    <Controls.Select
                        name="usersId"
                        label="Usuario"
                        value={values.usersId}
                        onChange={handleInputChange}
                        options={user}
                        error={errors.usersId}
                    />
                    <Controls.DatePicker
                        name="personDob"
                        label="Fecha nacimiento"
                        value={values.personDob}
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
