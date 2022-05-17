import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Typography,Button,Divider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import useStyles from '../../Style'
import { useState,useEffect} from'react'

const SessionManagement = ({modulesList,teachersList,groupsList,sallesList}) => {
  const [age, setAge] = useState('');
  const [value, setValue] = useState(null);
  const classes = useStyles()
  const [moduleOfSession,setModuleOfSession] = useState('')
  const [startingTime,setStartingTime] = useState(null)
  const [endingTime,setEndingTime] = useState(null)
  const [teacherOfModule,setTeacherOfModule] = useState('')
  const [salleOfSession,setSalleOfSession] = useState('')
  const [groupSession,setGroupSession] = useState('');

  const handleUpdateClick = () => {

  }

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div style= {{marginLeft:'10px',overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: 'auto',border:'1px solid #E5E5E5'}}>
      <div className={classes.teacherListHeader}>
        <Typography variant="h6">
          Session Management
        </Typography>
        <div style={{flex: 1,display: 'flex',flexDirection: 'row',justifyContent: 'flex-end'}}>
          <Button variant="contained" onClick={handleUpdateClick} size="small" style= {{boxShadow:'0px 4px 8px rgba(0,122,255,0.2)',borderRadius:'10px',marginRight: 10}}>Update</Button>  
        </div>
      </div>

      <Divider />

      <div style={{display: 'flex'}}>
        <div style= {{marginLeft:'20px',marginTop:'10px',width: '50%'}}>

          <Box sx={{ minWidth: 120 }}>
            <FormControl style={{width:'350px',}}>
              <InputLabel id="demo-simple-select-label">Module</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={moduleOfSession}
                label="Module"
                onChange={(event) => setModuleOfSession(event.target.value)}
              >
                {modulesList.map(module =>  <MenuItem value={module.name} key={module.id}>{module.name}</MenuItem>)
                } 
              </Select>
            </FormControl>
          </Box>
  
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={'10px'} style={{ width:'350px',marginTop:'10px',marginBottom:'10px' }}>
              <div style={{display:'flex',flexDirection:'row',width:'100%',alignItems: 'center'}}>
                <label htmlfor='startTime' style={{width:'50px',marginLeft:'10px',marginRight:'10px'}}>
                  <Typography variant='subtitle2'>
                    from
                  </Typography>
                </label>
                <DesktopTimePicker
                  label="Starting time"
                  value={startingTime}
                  id='startTime'
                  onChange={(newValue) => {
                    setStartingTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} sx={{width: '100%'}}/>}
                />
              </div>
              <div style={{display:'flex',flexDirection:'row',width:'100%',alignItems: 'center'}}>
                <label htmlfor='startTime' style={{width:'50px',marginLeft:'10px',marginRight:'10px'}}>
                <Typography variant='subtitle2'>
                    to
                  </Typography>
                </label>
                <DesktopTimePicker
                  id="endTime"
                  label="Ending time"
                  value={endingTime}
                  onChange={(newValue) => {
                    setEndingTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} sx={{width: '100%'}}/>}
                />
              </div>
            </Stack>
          </LocalizationProvider>

        </div>

        <div style= {{marginLeft:'10px',marginTop:'10px',width: '50%'}}>
          <div style={{display:'flex',flexDirection:'row',width:'400px',alignItems: 'center'}}>
    
            <Box sx={{ minWidth: 120,marginBottom:'10px' }}>
                <FormControl style={{width:'350px',}}>
                  <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={teacherOfModule}
                    label="Teacher"
                    onChange={event => setTeacherOfModule(event.target.value)}
                  >
                    {teachersList.map(teacher => 
                      <MenuItem value={teacher.name} key={teacher.id}>{teacher.name}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Box>
          </div>

          <div style={{display:'flex',flexDirection:'row',width:'400px',alignItems: 'center'}}>
            <label htmlfor='inSalle' style={{width:'40px',marginLeft:'10px',marginRight:'10px'}}>
              <Typography variant='subtitle2'>
                    Group
              </Typography>
            </label>
            <Box sx={{ minWidth: 120 }}>
            <FormControl style={{width:'290px',}}>
              <InputLabel id="demo-simple-select-label">Group</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={groupSession}
                label="Group"
                onChange={event => setGroupSession(event.target.value)}
              >
                {groupsList.map(group => <MenuItem value={group.name} key={group.id}>{group.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
        </div>

        <div style={{display:'flex',flexDirection:'row',width:'350px',alignItems: 'center',marginBottom:'10px',marginTop:'10px'}}>
            <label htmlfor='inSalle' style={{width: '40px',marginLeft:'10px',marginRight:'10px'}}>
            <Typography variant='subtitle2'>
                    In
            </Typography>
            </label>
            <Box sx={{ minWidth: 120 }}>
              <FormControl style={{width:'290px'}}>
                <InputLabel id="demo-simple-select-label">Salle</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="inSalle"
                  value={salleOfSession}
                  label="Salle"
                  onChange={event => setSalleOfSession(event.target.value)}
                >
                  {sallesList.map(sale =>  <MenuItem value={sale.name} key={sale.name}>{sale.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionManagement
