import React from 'react'
import {Typography} from "@mui/material";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useState,useEffect } from 'react';
import Select from '@mui/material/Select';
import ApplyConfirm from './ApplyConfirm'

const StudentManagement = ({studentGroups,studentSections,studentObj}) => {
  const [group, setGroup] = useState('');
  const [section, setSection] = useState('');
  const [disableApply,setDisableApply] = useState(true);
  
  useEffect(() => {
    if(group ==='' || section === '') {
      setDisableApply(true);
    }else {
      setDisableApply(false);
    }
  },[group, section])
  
  return (
    <div style= {{marginLeft:'10px',overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '220px',border:'1px solid #E5E5E5'}}>
      <div style={{height: '25%',display:'flex',alignItems: 'center',marginLeft: 10,}}>
        <Typography variant="h6" style={{flex: 1}}>
          Student Management
        </Typography>
        <div style={{flex: 1,display: 'flex',flexDirection: 'row',justifyContent: 'flex-end'}}>
          <ApplyConfirm studentGroups={studentGroups} studentSections={studentSections}
          studentObj={studentObj} disableApply={disableApply} group={group}
          section={section}/>
        </div>
      </div>
      <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Group</InputLabel>
        <Select
          sx={{ width: '300px',marginLeft:'10px' }}
          style={{ backgroundColor:'rgba(15,76,117,0.07)',borderRadius:'20px',color:'rgba(15, 76, 117, 0.6)'}}
          labelid="demo-simple-select-label"
          id="demo-simple-select"
          value={group}
          label="Group"
          onChange={(event) => setGroup(event.target.value)}
        >
          {studentGroups?studentGroups.map(group => <MenuItem key={group.id} value={group.name}>{group.name}</MenuItem>):''}
        </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 120,marginTop: '10px' }}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Section</InputLabel>
          <Select
            sx={{ width: '300px',marginLeft:'10px' }}
            style={{ backgroundColor:'rgba(15,76,117,0.07)',borderRadius:'20px',color:'rgba(15, 76, 117, 0.6)'}}
            labelid="demo-simple-select-label"
            id="demo-simple-select"
            value={section}
            label="section"
            onChange={(event) => setSection(event.target.value)}
          >
            {studentSections?studentSections.map(section => <MenuItem key={section.id} value={section.name}>{section.name}</MenuItem>):''}
          </Select>
        </FormControl>
      </Box>
    </div>
  )
}

export default StudentManagement