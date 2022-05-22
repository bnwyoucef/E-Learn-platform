import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import { useState,useEffect } from 'react';
import axios from '../../../Api/Axios'
import SelectSemestre from './SelectSemestre'
import SelectLevel from './SelectLevel'
import IconButton from '@mui/material/IconButton';
import ModeIcon from '@mui/icons-material/Mode';
import Tooltip from '@mui/material/Tooltip'; 

const UpdateModule = ({moduleId,newModule}) => {
    const [open, setOpen] = useState(false);
    const [displayMsg,setDisplayMsg] = useState(false);
    const [createSuccess,setCreateSuccess] = useState(false);
    const [name,setName] = useState('')
    const [coef,setCoef] = useState('')
    const [specialityId,setSpecialityId] = useState(0)
    const [shortName,setShortName] = useState('')
    const [description,setDescription] = useState('')
    const [levelId,setLevelId] = useState(0)
    const [semesterNum,setSemesterNum] = useState(0)
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleConfirm = async (event) => {
      event.preventDefault();
      const moduleToAdd = {}
      if(name) moduleToAdd.name = name
      if(description) moduleToAdd.description = description
      if(shortName) moduleToAdd.shortName = shortName
      if(levelId) moduleToAdd.level_Id = levelId.toString()
      if(semesterNum) moduleToAdd.semester = semesterNum.toString()

      try {
          console.log(moduleToAdd,moduleId);
          const response = await axios.patch(`module/update/${moduleId}`,moduleToAdd)
              setCreateSuccess(response.data.success)
              setDisplayMsg(true)
              setTimeout(handleClose,1000)
              //window.location.reload(); 
      } catch (error) {
          console.log('there is prblm: ' + error.message);
          setDisplayMsg(true)
      }
    }
  
    useEffect(() => {setDisplayMsg(false)},[name,shortName,description,levelId,semesterNum])

  return (
    <div>
      <Tooltip title="Update">
        <IconButton aria-label="delete" onClick={handleClickOpen} size="small" style= {{borderRadius:'10px',marginRight: 10,backgroundColor:'#007AFF'}}>
          <ModeIcon style={{color:"white"}}/>
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Module Room</DialogTitle>
        <DialogContent>
            {displayMsg && createSuccess && <Alert severity="success">Module added successfully</Alert>}
            {displayMsg && !createSuccess && <Alert severity="error">Oops Something went wrong!</Alert>}
            <form onSubmit={handleConfirm}>
            <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value= {name}
                  onChange= {e => setName(e.target.value)}
              />
              <TextField
                  margin="dense"
                  id="name"
                  label="Short name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value= {shortName}
                  onChange= {e => setShortName(e.target.value)}
              />
              <TextField
                  margin="dense"
                  id="name"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value= {description}
                  onChange= {e => setDescription(e.target.value)}
              />
              <TextField
                  margin="dense"
                  id="coef"
                  label="Coefficient"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                  value= {coef}
                  onChange= {e => setCoef(e.target.value)}
              />
              <SelectSemestre setSemestreNumber={setSemesterNum}/>
              <SelectLevel setLevelNumber={setLevelId} setSpecialityId={setSpecialityId}/>
              
              <Button type="submit" style={{float:'right',marginTop:'30px'}}>Confirm</Button>
              <Button onClick={handleClose} style={{float:'right',marginTop:'30px'}}>Cancel</Button>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateModule