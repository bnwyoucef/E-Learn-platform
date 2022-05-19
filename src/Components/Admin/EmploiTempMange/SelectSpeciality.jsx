import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState} from 'react'

const SelectSpeciality = ({selectedSpeciality,setSelectedSpeciality,specialitiesList}) => {
    const [specialityList,setSpecialityList] = useState([])
  return (
    <div>
        <Box sx={{ width: 120,marginRight:'13px' }}>
        <FormControl fullWidth  size="small" >
            <InputLabel id="demo-simple-select-label">Speciality</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedSpeciality}
                label={'Speciality'}
                onChange={event => setSelectedSpeciality(event.target.value)}
            >
            {specialitiesList.map((item) => {
                    return <MenuItem value={item.name} key={item.id}>{item.shortName}</MenuItem>
                })}
            </Select>
        </FormControl>
        </Box>
    </div>
  )
}

export default SelectSpeciality
