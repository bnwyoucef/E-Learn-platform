import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectGroup({ groupList,group,setGroup,setGroupId }) {

  console.log(">>>>>>>>>>>>>>>>>>> ",groupList,group);
  function handleChange(event) {
    console.log("ggggggggggggg ", event.target.value);
    setGroup(event.target.value);
    let currentGroup = groupList.find(item => item.name === event.target.value)
    console.log("<<<<<<<<<<<<<<<>>>>>>>>>>> ",currentGroup.id);
    setGroupId(currentGroup.id) 
  }

  return (
    <div>
    <Box sx={{ minWidth: 120,marginTop:'10px' }}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-label" style={{marginLeft:'10px'}}>Group</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={group}
          label="Group"
          variant="outlined"
          onChange={handleChange}
        >
            {groupList.map((item,index) => {
                return <MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>
            })}
        </Select>
      </FormControl>
    </Box>
    </div>
  )
}
