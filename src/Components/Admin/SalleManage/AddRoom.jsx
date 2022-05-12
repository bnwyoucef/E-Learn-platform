import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import { useState,useEffect } from 'react';
import axios from '../../../Api/Axios'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const AddRoom = () => {

    const [open, setOpen] = useState(false);
    const [name,setName] = useState('')
    const [capacity,setCapacity] = useState(0)
    const [displayMsg,setDisplayMsg] = useState(false);
    const [createSuccess,setCreateSuccess] = useState(false);
    const [hasDataShow, setHasDataShow] = useState(true);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (event) => {
      setHasDataShow(event.target.checked);
    };
  
    const handleConfirm = async (event) => {
      event.preventDefault();
      const cInt = parseInt(capacity)
      const room = {name,capacity:cInt,hasDataShow}
      try {
          const response = await axios.post(`sale/create`,room,{
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
  
    useEffect(() => {setDisplayMsg(false)},[name,capacity,hasDataShow])

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} size="small" style= {{boxShadow:'0px 4px 8px rgba(0,122,255,0.2)',borderRadius:'10px',marginRight: 10}}>
        Add Room
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Room</DialogTitle>
        <DialogContent>
            {displayMsg && createSuccess && <Alert severity="success">Room added successfully</Alert>}
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
                  label="Capacity"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                  value= {capacity}
                  onChange= {e => setCapacity(e.target.value)}
              />
              <FormControlLabel
              control = {
                <Checkbox
                    checked={hasDataShow}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                /> }
                label="Has Datashow"
              />
              
              <Button type="submit" style={{float:'right',marginTop:'30px'}}>Confirm</Button>
              <Button onClick={handleClose} style={{float:'right',marginTop:'30px'}}>Cancel</Button>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddRoom
