import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from 'date-fns';

export default function DatePicker(props) {

    const { name, label, value, onChange } = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          inputVariant="outlined"
          label={label}
          format="MMM/dd/yyyy"
          name={name}
          value={value}
          onChange={(date) => {
            // Formatear la fecha en el formato deseado (MM/dd/yyyy)
            const formattedDate = format(date, 'MM/dd/yyyy');
            console.log('Fecha seleccionada en formato MM/dd/yyyy:', formattedDate);
      
            // Luego, puedes realizar otras operaciones con la fecha si es necesario
            onChange(convertToDefEventPara(name, formattedDate));
          }}
        />
      </MuiPickersUtilsProvider>
      
    )
}
