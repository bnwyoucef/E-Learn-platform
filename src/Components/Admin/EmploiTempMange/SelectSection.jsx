import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState} from 'react'

const SelectSection = ({selectedSection,setSelectedSection,sectionsList}) => {
   
  return (
    <div>
        <Box sx={{ width: 120,marginRight:'13px' }}>
        <FormControl fullWidth  size="small" >
            <InputLabel id="demo-simple-select-label">Section</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedSection}
                label={'Section'}
                onChange={event => setSelectedSection(event.target.value)}
            >
            {sectionsList?sectionsList.map((item) => {
                    return <MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>
                }):''}
            </Select>
        </FormControl>
        </Box>
    </div>
  )
}

export default SelectSection