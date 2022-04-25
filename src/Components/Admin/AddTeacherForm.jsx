import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import { useState,useEffect } from 'react';
import axios from '../../Api/Axios'

export default function AddTeacherForm() {
  const [open, setOpen] = React.useState(false);
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
    const teacher = {name:firstName,lastName,email,password,wilaya}
    try {
        const response = await axios.post('http://localhost:5000/teacher/create',teacher,{
            headers: { 'Content-Type': 'application/json' }})
            setCreateSuccess(response.data.success)
            setDisplayMsg(true)
            setTimeout(handleClose,1000)
            window.location.reload(); 
    } catch (error) {
        console.log('there is prblm: ' + error.message);
        setDisplayMsg(true)
    }
  }

  useEffect(() => {setDisplayMsg(false)},[firstName,lastName,email,password,wilaya])

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} style= {{marginRight: 10}}>
        Add Teacher
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Teacher</DialogTitle>
        <DialogContent>
            {displayMsg && createSuccess && <Alert severity="success">Teacher created successfully</Alert>}
            {displayMsg && !createSuccess && <Alert severity="error">Oops Something went wrong!</Alert>}
            <form>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="First name"
                type="text"
                fullWidth
                variant="standard"
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
                variant="standard"
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
                variant="standard"
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
                variant="standard"
                required
                value= {password}
                onChange= {e => setPassword(e.target.value)}
            />
            <TextField
                margin="dense"
                id="name"
                label="Wilaya"
                type="text"
                fullWidth
                variant="standard"
                required
                value= {wilaya}
                onChange= {e => setWilaya(e.target.value)}
            />
            <Button type="submit" onClick={handleConfirm} style={{float:'right',marginTop:'30px'}}>Confirme</Button>
            <Button onClick={handleClose} style={{float:'right',marginTop:'30px'}}>Cancel</Button>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}