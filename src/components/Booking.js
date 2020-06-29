import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';



export default class Booking extends Component {


    render() {

        return (
            <form noValidate>
            <TextField
                id="time_start"
                label="Rozpoczęcie"
                type="time"
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
                }}
            />
            <TextField
                id="time_end"
                label="Zakończenie"
                type="time"
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
                }}
            />
            </form>


        )
}




}
    