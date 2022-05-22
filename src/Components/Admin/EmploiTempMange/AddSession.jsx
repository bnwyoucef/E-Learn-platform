import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import {useState,useEffect} from 'react'
import axios from '../../../Api/Axios'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

const AddSession = ({groupsList,modulesList,section_Id,semester,dayName}) => {

    const [open, setOpen] = React.useState(false);
    const [lesson_Type,setLessonType] = useState('')
    const [startTime,setStartTime] = useState(null)
    const [endTime,setEndTime] = useState(null)
    const [saleName,setSaleName] = useState('')
    const [teacherName,setTeacherName] = useState('')
    const [moduleName,setModuleName] = useState('')
    const [groupName,setGroupName] = useState('')
    const [displayMsg,setDisplayMsg] = useState(false);
    const [createSuccess,setCreateSuccess] = useState(false);
    const [teachersList,setTeachersList] = useState([]);
    const [salesList,setSalesList] = useState([]);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    async function getAllTeacherAndSales() {
      try {
        const response = await axios.get('teacher/all')
        const response2 = await axios.get('sale/all')
        setTeachersList(response.data.message)
        setSalesList(response2.data.message)
      } catch (error) {
        
      }
    }

    let dayList = [{id:1,name:'Sunday'},{id:2,name:'Monday'},{id:3,name:'Tuesday'},{id:4,name:'Wednesday'},{id:5,name:'Thursday'}]
    let lessonTypeList = [{id:1,name:'COURS'},{id:2,name:'TD'},{id:3,name:'TP'}]
    let semsterList = [{id:1,name:'semester 1'},{id:2,name:'semester 2'}]

    async function handleConfirm(event) {
      event.preventDefault()
        let newSession ={}
        let day = dayList.find(item => item.name === dayName).id
        let sale_Id = salesList.find(item => item.name === saleName).id
        let teacher_Id = parseInt(teachersList.find(item => item.name === teacherName).id)
        let group_Id = groupsList.find(item => item.name === groupName).id
        let module_Id = modulesList.find(item => item.name === moduleName).id
        newSession = {day,lesson_Type,startingTime:startTime.toString().substring(16,21),endingTime:endTime.toString().substring(16,21),sale_Id,teacher_Id,group_Id,module_Id,section_Id,semester}
        
        try {
            const response = await axios.post('lessons/create', newSession)
            setCreateSuccess(response.data.success)
            setDisplayMsg(true)
            setTimeout(handleClose,1000)
            //window.location.reload(); 
        } catch (error) {
            setDisplayMsg(true)
        }
    }

    useEffect(() => {setDisplayMsg(false)},[dayName,lesson_Type,startTime,endTime,saleName,teacherName,moduleName,groupName])
    useEffect(() => {getAllTeacherAndSales()},[])

  return (
    <div>
      <Button size="small" style={{boxShadow:'0px 4px 8px rgba(0,122,255,0.2)',borderRadius:'10px',width: '100%',position:'absolute',bottom: '0px',color:'#3282B8'}} onClick={handleClickOpen}>
        Add session
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Session</DialogTitle>
        <DialogContent>
            {displayMsg && createSuccess && <Alert severity="success">Session created successfully</Alert>}
            {displayMsg && !createSuccess && <Alert severity="error">Oops Something went wrong!</Alert>}
            <form onSubmit={handleConfirm}>

            <div>
              <Box sx={{ minWidth: 120 }}>
                <FormControl style={{width:'350px',}}>
                  <InputLabel id="demo-simple-select-label">Lesson type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={lesson_Type}
                    label="Lesson Type"
                    required
                    onChange={(event) => setLessonType(event.target.value)}
                  >
                    {lessonTypeList.map(day =>  <MenuItem value={day.name} key={day.id}>{day.name}</MenuItem>)
                    } 
                  </Select>
                </FormControl>
              </Box>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={'10px'} style={{ width:'350px',marginTop:'10px',marginBottom:'10px' }}>
                    <DesktopTimePicker
                      label="Starting time"
                      value={startTime}
                      id='startTime'
                      required
                      onChange={(newValue) => {
                        setStartTime(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} sx={{width: '100%'}}/>}
                    />
                    <DesktopTimePicker
                      id="endTime"
                      label="Ending time"
                      required
                      value={endTime}
                      onChange={(newValue) => {
                        setEndTime(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} sx={{width: '100%'}}/>}
                    />
                </Stack>
              </LocalizationProvider>
            </div>

             <Box sx={{ minWidth: 120,marginBottom:'10px' }}>
                <FormControl style={{width:'350px',}}>
                  <InputLabel id="demo-simple-select-label">Salle</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={saleName}
                    label="Salle"
                    required
                    onChange={(event) => setSaleName(event.target.value)}
                  >
                    {salesList.map(item =>  <MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>)
                    } 
                  </Select>
                </FormControl>
            </Box>

              <Box sx={{ minWidth: 120,marginBottom:'10px' }}>
                <FormControl style={{width:'350px',}}>
                  <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={teacherName}
                    label="Teacher"
                    required
                    onChange={(event) => setTeacherName(event.target.value)}
                  >
                    {teachersList.map(item =>  <MenuItem value={item.name} key={item.id}>{item.name+' ' +item.lastName}</MenuItem>)
                    } 
                  </Select>
                </FormControl>
              </Box>

             <Box sx={{ minWidth: 120,marginBottom:'10px' }}>
                <FormControl style={{width:'350px',}}>
                  <InputLabel id="demo-simple-select-label">Group</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={groupName}
                    label="Group"
                    onChange={(event) => setGroupName(event.target.value)}
                  >
                    {groupsList.map(item =>  <MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>)
                    } 
                  </Select>
                </FormControl>
            </Box>

              <Box sx={{ minWidth: 120,marginBottom:'10px' }}>
                <FormControl style={{width:'350px',}}>
                  <InputLabel id="demo-simple-select-label">Module</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={moduleName}
                    label="Module"
                    required
                    onChange={(event) => setModuleName(event.target.value)}
                  >
                    {modulesList.map(item =>  <MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>)
                    } 
                  </Select>
                </FormControl>
              </Box>

              <Button type="submit" style={{float:'right',marginTop:'30px'}}>Confirme</Button>
              <Button onClick={handleClose} style={{float:'right',marginTop:'30px'}}>Cancel</Button>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddSession
