import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import { useState,useEffect } from 'react';
import axios from '../../../Api/Axios'
import BasicSelect from '../WilayaChose'
import SelectGroup from './SelectGroup'

const AddStudentForm = ({groupList,enableAddStudent,batch_Id,speciality_Id,section_Id}) => {

    const [open, setOpen] = React.useState(false);
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [wilaya,setWilaya] = useState('');
    const [group,setGroup] = useState('');
    const [displayMsg,setDisplayMsg] = useState(false);
    const [createSuccess,setCreateSuccess] = useState(false);
    const [groupId,setGroupId] = useState(0);
    
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleConfirm = async (event) => {
      event.preventDefault();
      let student = {}
      let gh = parseInt(speciality_Id)
      if(speciality_Id === 0) {
        student = {name:firstName,lastName,email,password,dateOfBirth:"2000-06-12",wilaya,group_Id:groupId,batch_Id,section_Id}
      }else {
        student = {name:firstName,lastName,email,password,dateOfBirth:"2000-06-12",wilaya,group_Id:groupId,batch_Id,gh,section_Id}
      }
      console.log(student);
      try {
          const response = await axios.post(`student/create`,student,{
              headers: { 'Content-Type': 'application/json' }})
              setCreateSuccess(response.data.success)
              setDisplayMsg(true)
              setTimeout(handleClose,1000)
              //window.location.reload(); 
      }  catch (error) {
          console.log('there is prblm: ' + error.message);
          setDisplayMsg(true)
      }
    }
  
    useEffect(() => {setDisplayMsg(false)},[firstName,lastName,email,password,group])

  return (
    <div>
    <Button variant="contained" disabled = {!enableAddStudent} onClick={handleClickOpen} size="small" style= {{boxShadow:'0px 4px 8px rgba(0,122,255,0.2)',borderRadius:'10px',marginRight: 10}}>
      Add Student
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Student</DialogTitle>
      <DialogContent>
          {displayMsg && createSuccess && <Alert severity="success">Teacher created successfully</Alert>}
          {displayMsg && !createSuccess && <Alert severity="error">Oops Something went wrong!</Alert>}
          <form onSubmit={handleConfirm}>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="First name"
                type="text"
                fullWidth
                variant="outlined"
                required
                value= {firstName}
                onChange= {e => setFirstName(e.target.value)}
            />
            <TextField
                margin="dense"
                id="name"
                label="Last name"
                type="text"
                fullWidth
                variant="outlined"
                required
                value= {lastName}
                onChange= {e => setLastName(e.target.value)}
            />
            <TextField
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                required
                value= {email}
                onChange= {e => setEmail(e.target.value)}
            />
            <TextField
                margin="dense"
                id="name"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                required
                value= {password}
                onChange= {e => setPassword(e.target.value)}
            />
            <BasicSelect wilaya = { wilaya } setWilaya = {setWilaya}/>
            <SelectGroup groupList = {groupList} group = { group } setGroup = {setGroup} setWilaya = {setGroup} setGroupId={setGroupId}/>

            <Button type="submit" style={{float:'right',marginTop:'30px'}}>Confirme</Button>
            <Button onClick={handleClose} style={{float:'right',marginTop:'30px'}}>Cancel</Button>
          </form>
      </DialogContent>
    </Dialog>
  </div>
  )
}

export default AddStudentForm