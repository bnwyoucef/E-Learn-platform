import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectSemestre = ({setSemestreNumber}) => {
    
    let semestreList = [{number:1,name:"semestre 1"},{number:2,name:"semestre 2"}]
    const [cuSemestre,setCuSemestre] = React.useState('')

    function handleChange(event) {
        setCuSemestre(event.target.value)
        let currentSemestre = semestreList.find(item => item.name === event.target.value) 
        setSemestreNumber(currentSemestre.number)
    }

  return (
    <div>
        <Box sx={{ minWidth: 120,marginTop:'10px' }}>
        <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-label" style={{marginLeft:'10px'}}>Semester</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cuSemestre}
            label="Semester"
            variant="outlined"
            onChange={handleChange}
            >
                {semestreList.map((item) => {
                    return <MenuItem value={item.name} key={item.number}>{item.name}</MenuItem>
                })}
            </Select>
        </FormControl>
        </Box>
    </div>
  )
}

export default SelectSemestre
