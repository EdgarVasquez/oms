import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from '../../../components/useForm';
import axios from '../../../http-common'

const initialFValues = {
  id: 0,
  personIdentification: "",
  iType: 0,
  personName: "",
  personLastname: "",
  personLicense: "",
  personAddress: "",
  personPhone: "",
  dob: new Date(),
  personLicense: "",
  usersId: 0,//
  organization_id: "123",
  userEmail: "",
  upassword: "",
  rolId: 0,
  condition: true
}

export default function EmpleadoForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('personIdentification' in fieldValues)
            temp.personIdentification = fieldValues.personIdentification ? "" : "This field is required."
        if ('iType' in fieldValues)
            temp.iType = fieldValues.iType ? "" : "This field is required."
        if ('personName' in fieldValues)
            temp.personName = fieldValues.personName ? "" : "This field is required."
        if ('personLastname' in fieldValues)
            temp.personLastname = fieldValues.personLastname ? "" : "This field is required."
        if ('personLicense' in fieldValues)
            temp.personLicense = fieldValues.personLicense ? "" : "This field is required."
        if ('personAddress' in fieldValues)
            temp.personAddress = fieldValues.personAddress ? "" : "This field is required."
        if ('personPhone' in fieldValues)
            temp.personPhone = fieldValues.personPhone ? "" : "This field is required."
        if ('dob' in fieldValues)
            temp.dob = fieldValues.dob ? "" :  "This field is required."
        if ('userEmail' in fieldValues)
            temp.userEmail = fieldValues.userEmail ? "" : "This field is required."
        if ('rolId' in fieldValues)
            temp.rolId = fieldValues.rolId ? "" : "This field is required."
        
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
        console.log(data)
        })
    }, []);

    const [rol, setRol] = useState([]);
    useEffect(() => {
        axios.get('Rol/Getrol/0')
        .then((response) => {
        let data = response.data.dataList
        setRol(data)
        console.log(data)
        })
    }, []);

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={4}>
                <Controls.Select
                        name="iType"
                        label="Tipo de identificación"
                        value={values.iType}
                        onChange={handleInputChange}
                        options={identificationType}
                        error={errors.iType}
                    />
                    <Controls.Input
                        name="personIdentification"
                        label="Documento identificación"
                        value={values.personIdentification}
                        onChange={handleInputChange}
                        error={errors.personIdentification}
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
                           
                </Grid>
                <Grid item xs={4}>
                <Controls.Input
                        name="personLicense"
                        label="Licencia"
                        value={values.personLicense}
                        onChange={handleInputChange}
                        error={errors.personLicense}
                    />
                <Controls.Input
                        name="personAddress"
                        label="Dirección"
                        value={values.personAddress}
                        onChange={handleInputChange}
                        error={errors.personAddress}
                    />
                <Controls.Input
                        name="personPhone"
                        label="Teléfono"
                        value={values.personPhone}
                        onChange={handleInputChange}
                        error={errors.personPhone}
                    />
                    <Controls.DatePicker
                        name="dob"
                        label="Fecha nacimiento"
                        value={values.dob}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Controls.Input
                            name="userEmail"
                            label="Usuario"
                            value={values.userEmail}
                            onChange={handleInputChange}
                            error={errors.userEmail}
                    />
                    <Controls.Input
                            name="upassword"
                            label="Contraseña"
                            value={values.upassword}
                            onChange={handleInputChange}
                            error={errors.upassword}
                    />
                    <Controls.Select
                        name="rolId"
                        label="Rol"
                        value={values.rolId}
                        onChange={handleInputChange}
                        options={rol}
                        error={errors.rolId}
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
