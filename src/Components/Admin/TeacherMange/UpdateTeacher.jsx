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

const UpdateTeacher = ({teacher,theList,setTheList}) => {
    
    const [open, setOpen] = useState(false);
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [wilaya,setWilaya] = useState('');
    const [displayMsg,setDisplayMsg] = useState(false);
    const [createSuccess,setCreateSuccess] = useState(false);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleConfirm = async (event) => {
      event.preventDefault();
      const teacherNew = {}
      if(firstName) {
        teacherNew.name = firstName
      }
      if(lastName) {
        teacherNew.lastName = lastName
      }
      if(email) {
        teacherNew.email = email
      }
      if(password) {
        teacherNew.password = password
      }
      if(wilaya) {
        teacherNew.wilaya = wilaya
      }

      try {
          const response = await axios.patch(`teacher/update/${teacher.id}`,teacherNew)
              setCreateSuccess(response.data.success)
              setDisplayMsg(true)
              setTimeout(handleClose,1000)
              let newList = [...theList].map(item => item.id === teacher.id?response.data.message:item)
              setTheList(newList)
      } catch (error) {
          console.log('there is prblm: ' + error.message);
          setDisplayMsg(true)
      }
    }
  
    useEffect(() => {setDisplayMsg(false)},[firstName,lastName,email,password,wilaya])
  
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} size="small"
      style={{boxShadow:'0px 4px 8px rgba(0,122,255,0.2)',borderRadius:'10px',marginTop: 30}}>
        Update Teacher
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Teacher</DialogTitle>
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
                  value= {password}
                  onChange= {e => setPassword(e.target.value)}
              />
              <BasicSelect wilaya = { wilaya } setWilaya = {setWilaya}/>
              <Button type="submit" style={{float:'right',marginTop:'30px'}}>Confirme</Button>
              <Button onClick={handleClose} style={{float:'right',marginTop:'30px'}}>Cancel</Button>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateTeacher
