import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import { useState,useEffect } from 'react';
import axios from '../../../Api/Axios';

const AddGroup = ({theList,setTheList,currentSection}) => {

    const [open, setOpen] = useState(false);
    const [name,setName] = useState('');
    const [displayMsg,setDisplayMsg] = useState(false);
    const [createSuccess,setCreateSuccess] = useState(false);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setName('');
      setDisplayMsg(false)
    };
  
    const handleConfirm = async (event) => {
      event.preventDefault();
      let newGroup = {name,section_Id:currentSection.id};
      try {
          const response = await axios.post(`group/create`,newGroup,{
              headers: { 'Content-Type': 'application/json' }});
              setCreateSuccess(response.data.success);
              setDisplayMsg(true);
              setTimeout(handleClose,500);
              let newList = [...theList];
              newList.push(response.data.message);
              setTheList(newList);
      } catch (error) {
          console.log('there is prblm: ' + error.message);
          setDisplayMsg(true);
      }
    }
  
    useEffect(() => {setDisplayMsg(false)},[name]);

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} size="small" disabled={!Object.keys(currentSection).length> 0} style= {{boxShadow:'0px 4px 8px rgba(0,122,255,0.2)',borderRadius:'10px',marginRight: 10}}>
        Add Group
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Group</DialogTitle>
        <DialogContent>
            {displayMsg && createSuccess && <Alert severity="success">Group added successfully</Alert>}
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
              <Button type="submit" style={{float:'right',marginTop:'30px'}}>Confirm</Button>
              <Button onClick={handleClose} style={{float:'right',marginTop:'30px'}}>Cancel</Button>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddGroup
