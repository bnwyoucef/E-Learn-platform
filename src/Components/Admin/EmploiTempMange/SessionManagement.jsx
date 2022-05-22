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
import axios from '../../../Api/Axios'

const SessionManagement = ({modulesList,groupsList,sessionClicked}) => {
  const classes = useStyles()
  const [moduleOfSession,setModuleOfSession] = useState('')
  const [startTime,setStartTime] = useState(null)
  const [endTime,setEndTime] = useState(null)
  const [teacherOfModule,setTeacherOfModule] = useState('')
  const [salleOfSession,setSalleOfSession] = useState('')
  const [groupSession,setGroupSession] = useState('');

  const [sallesList,setSallesList] = useState([])
  const [teachersList,setTeachersList] = useState([])
  const [enableUpdateBtn,setEnableUpdateBtn] = useState(false)

  async function getTeachersAndSalles() {
    try {
      const response = await axios.get('teacher/all')
      const response2 = await axios.get('sale/all')
      setSallesList(response2.data.message)
      setTeachersList(response.data.message)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if(Object.keys(sessionClicked).length !== 0) {
      getTeachersAndSalles()
      setEnableUpdateBtn(true)
    }
  },[sessionClicked])

   const handleUpdateClick = async () => {
    console.log("clicked session is:", sessionClicked);
    let newSession = {day:1,lesson_Type:sessionClicked.lesson_Type}
    if(moduleOfSession){
      let module_Id = modulesList.find(item => item.name === moduleOfSession).id
      newSession.module_Id = module_Id
    }
    if(startTime) {
      newSession.startingTime = startTime.toString().substring(16,21)
    }
    if(endTime) {
      newSession.endingTime = endTime.toString().substring(16,21)
    }
    if(teacherOfModule) {
      let teacher_Id = parseInt(teachersList.find(item => item.name === teacherOfModule).id)
      newSession.teacher_Id = teacher_Id
    }
    if(salleOfSession) {
      let sale_Id = sallesList.find(item => item.name === salleOfSession).id
      newSession.sale_Id = sale_Id
    }
    if(groupSession) {
      let group_Id = groupsList.find(item => item.name === groupSession).id
      newSession.group_Id = group_Id
    }

    try {
      const response = await axios.patch(`lessons/update/${sessionClicked.id}`,newSession)
      console.log("update status:",response.data.message);
    } catch (error) {
      
    }
  }

  return (
    <div style= {{marginLeft:'10px',overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: 'auto',border:'1px solid #E5E5E5'}}>
      <div className={classes.teacherListHeader}>
        <Typography variant="h6">
          Session Management
        </Typography>
        <div style={{flex: 1,display: 'flex',flexDirection: 'row',justifyContent: 'flex-end'}}>
          <Button variant="contained" disabled={!enableUpdateBtn} onClick={handleUpdateClick} size="small" style= {{boxShadow:'0px 4px 8px rgba(0,122,255,0.2)',borderRadius:'10px',marginRight: 10}}>
            Update
          </Button>  
        </div>
      </div>

      <Divider />

      <div style={{display: 'flex'}}>
        <div style= {{marginLeft:'20px',marginTop:'10px',width: '50%'}}>

          <Box sx={{ minWidth: 120 }}>
            <FormControl style={{width:'350px',}}>
              <InputLabel id="demo-simple-select-label">Module</InputLabel>
              <Select
              style={{ backgroundColor:'rgba(15,76,117,0.07)',borderRadius:'20px',color:'rgba(15, 76, 117, 0.6)'}}
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
                <label htmlFor='startTime' style={{width:'50px',marginLeft:'10px',marginRight:'10px'}}>
                  <Typography variant='subtitle2'>
                    from
                  </Typography>
                </label>
                <DesktopTimePicker
                  label="Starting time"
                  value={startTime}
                  id='startTime'
                  onChange={(newValue) => {
                    setStartTime(newValue);
                  }}
                  renderInput={(params) => <TextField 
                    style={{borderRadius:'10px',backgroundColor: 'rgba(15,76,117,0.07)',flex: 2}}
                    {...params}
                    sx={{width: '100%'}}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}/>}
                />
              </div>
              <div style={{display:'flex',flexDirection:'row',width:'100%',alignItems: 'center'}}>
                <label htmlFor='startTime' style={{width:'50px',marginLeft:'10px',marginRight:'10px'}}>
                <Typography variant='subtitle2'>
                    to
                  </Typography>
                </label>
                <DesktopTimePicker
                  id="endTime"
                  label="Ending time"
                  value={endTime}
                  onChange={(newValue) => {
                    setEndTime(newValue);
                  }}
                  renderInput={(params) => <TextField
                    style={{borderRadius:'10px',backgroundColor: 'rgba(15,76,117,0.07)',flex: 2}}
                    {...params}
                    sx={{width: '100%'}}
                    variant="standard"
                    InputProps={{
                    disableUnderline: true}}/>}
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
                  style={{ backgroundColor:'rgba(15,76,117,0.07)',borderRadius:'20px',color:'rgba(15, 76, 117, 0.6)'}}
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
            <label htmlFor='inSalle' style={{width:'40px',marginLeft:'10px',marginRight:'10px'}}>
              <Typography variant='subtitle2'>
                    Group
              </Typography>
            </label>
            <Box sx={{ minWidth: 120 }}>
            <FormControl style={{width:'290px',}}>
              <InputLabel id="demo-simple-select-label">Group</InputLabel>
              <Select
              style={{ backgroundColor:'rgba(15,76,117,0.07)',borderRadius:'20px',color:'rgba(15, 76, 117, 0.6)'}}
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
            <label htmlFor='inSalle' style={{width: '40px',marginLeft:'10px',marginRight:'10px'}}>
            <Typography variant='subtitle2'>
                    In
            </Typography>
            </label>
            <Box sx={{ minWidth: 120 }}>
              <FormControl style={{width:'290px'}}>
                <InputLabel id="demo-simple-select-label">Salle</InputLabel>
                <Select
                style={{ backgroundColor:'rgba(15,76,117,0.07)',borderRadius:'20px',color:'rgba(15, 76, 117, 0.6)'}}
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
