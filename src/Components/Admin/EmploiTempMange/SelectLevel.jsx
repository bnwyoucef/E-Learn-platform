import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState,useEffect} from 'react'
import axios from '../../../Api/Axios'

const SelectLevel = ({setSelectedLevel,selectedLevel,levelList}) => {

  return (
    <div>
        <Box sx={{ width: 120,marginRight:'13px' }}>
        <FormControl fullWidth  size="small" >
            <InputLabel id="demo-simple-select-label">Level</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedLevel}
                label={selectedLevel}
                onChange={event => setSelectedLevel(event.target.value)}
            >
            {levelList?levelList.map((item) => {
                    return <MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>
                }):''}
            </Select>
        </FormControl>
        </Box>
    </div>
  )
}

export default SelectLevel