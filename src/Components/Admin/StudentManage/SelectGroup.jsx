import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectGroup({ groupList,group, setGroup }) {
  return (
    <div>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-label" style={{marginLeft:'10px'}}>Group</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={group}
          label="Group"
          variant="outlined"
          onChange={e => setGroup(e.target.value)}
        >
            {groupList.map((group,index) => {
                return <MenuItem value={group} key={index}>{group}</MenuItem>
            })}
        </Select>
      </FormControl>
    </Box>
    </div>
  )
}
