import React from 'react'
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';

const Calendar = () => {
    const [date, setDate] = React.useState(new Date());
  return (
    <div>
        <LocalizationProvider dateAdapter={AdapterDateFns} >
            <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} 
            style={{width:'100%', height:'400px',backgroundColor: 'white',borderRadius:'4px'}}/>
        </LocalizationProvider>
    </div>

  )
}

export default Calendar