import React from 'react'
import useStyles from '../../Style'
import {Button,Typography,TextField} from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react'

const StudentManagement = () => {
  const [group, setGroup] = useState('');

  const handleChange = (event) => {
    setGroup(event.target.value);
  };
  const classes = useStyles()
  return (
    <div style= {{overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '28vh'}}>
      <div style={{height: '25%',display:'flex',alignItems: 'center',marginLeft: 10,}}>
        <Typography variant="h6" style={{flex: 1}}>
          Student Management
        </Typography>
        <div style={{flex: 1,display: 'flex',flexDirection: 'row',justifyContent: 'flex-end'}}>
          <Button variant="contained" style= {{marginRight: 10}}>Apply</Button>
        </div>
      </div>
      <Box sx={{ minWidth: 120 }}>
        <TextField
          size='small'
          sx={{ width: '300px',marginLeft:'10px' }}
          style={{ backgroundColor:'rgba(15,76,117,0.07)',borderRadius:'20px',color:'rgba(15, 76, 117, 0.6)'}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={group}
          select
          label="group"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </TextField>

    </Box>
    </div>
  )
}

export default StudentManagement