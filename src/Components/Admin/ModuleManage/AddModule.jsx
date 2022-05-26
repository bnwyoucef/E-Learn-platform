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

const AddModule = ({theList,setTheList}) => {

    const [open, setOpen] = useState(false);
    const [name,setName] = useState('')
    const [shortName,setShortName] = useState('')
    const [description,setDescription] = useState('')
    const [coef,setCoef] = useState('')
    const [levelId,setLevelId] = useState(0)
    const [specialityId,setSpecialityId] = useState(0)
    const [semesterNum,setSemesterNum] = useState(0)
    const [displayMsg,setDisplayMsg] = useState(false);
    const [createSuccess,setCreateSuccess] = useState(false);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setName('')
      setShortName('')
      setDescription('')
      setCoef('')
      setDisplayMsg(false)
    };
  
    const handleConfirm = async (event) => {
      event.preventDefault();
      const level_Id = parseInt(levelId)
      const semester = parseInt(semesterNum)
      const coeff = parseInt(coef)
      const speciality_Id = parseInt(specialityId)
      let newModule={};
      if(speciality_Id) newModule = {level_Id:level_Id,semester,name,shortName,description,coef:coeff,speciality_Id:speciality_Id}
       else newModule = {level_Id:level_Id,semester,name,shortName,description,coef:coeff}
      console.log(newModule);
      try {
          const response = await axios.post(`module/create`,newModule,{
              headers: { 'Content-Type': 'application/json' }})
              setCreateSuccess(response.data.success)
              setDisplayMsg(true)
              setTimeout(handleClose,500)
              let newList = [...theList]
              newList.push(response.data.message) 
              setTheList(newList)
      } catch (error) {
          console.log('there is prblm: ' + error.message);
          setDisplayMsg(true)
      }
    }
  
    useEffect(() => {setDisplayMsg(false)},[name,shortName,description,levelId,semesterNum])

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} size="small" style= {{boxShadow:'0px 4px 8px rgba(0,122,255,0.2)',borderRadius:'10px',marginRight: 10}}>
        Add Module
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Module</DialogTitle>
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
                  required
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
                  required
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
                  required
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

export default AddModule
