import React from 'react'
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';

const Calendar = () => {
    const [date, setDate] = React.useState(new Date());
  return (
    <div style={{border:'1px solid #E5E5E5',width:'99%', height:'400px',backgroundColor: 'white',borderRadius:'4px',marginLeft:'10px'}}>
        <LocalizationProvider dateAdapter={AdapterDateFns} >
            <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
        </LocalizationProvider>
    </div>

  )
}

export default Calendar