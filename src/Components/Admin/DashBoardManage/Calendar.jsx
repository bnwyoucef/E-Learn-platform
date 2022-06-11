import React from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from '../../../Api/Axios';

const Calendar = () => {
    const [date, setDate] = React.useState(new Date());
    const [currentSemester,setCurrentSemester] = React.useState('');

    async function handleChange(event) {
      setCurrentSemester(event.target.value);
      try {
        const response = await axios.post(`current-semester/changeTo/${parseInt(event.target.value)}`); 
      } catch (error) {
        console.log(error.message);
      }
    }

    async function getCurrentSemester() {
      try {
        const response = await axios.get(`current-semester`);
        setCurrentSemester(response.data.message);
      }catch (error) {
        console.log(error.message);
      }
    }

    React.useEffect(getCurrentSemester,[]);
    
  
    
  return (
    <div style={{border:'1px solid #E5E5E5',width:'99%', height:'450px',backgroundColor: 'white',borderRadius:'4px',marginLeft:'10px',display: 'flex',flexDirection: 'column'}}>
        <LocalizationProvider dateAdapter={AdapterDateFns} >
            <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
        </LocalizationProvider>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Semester</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentSemester}
              label="Semester"
              onChange={e => handleChange(e)}
            >
              <MenuItem value={1}>Semester 01</MenuItem>
              <MenuItem value={2}>Semester 02</MenuItem>
            </Select>
          </FormControl>
      </Box>
    </div>

  )
}

export default Calendar