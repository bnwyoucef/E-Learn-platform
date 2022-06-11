import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState,useEffect } from 'react';
import axios from '../../../Api/Axios'

const AddSection = ({theList,setTheList,currentBatch}) => {

    const [open, setOpen] = useState(false);
    const [name,setName] = useState('');
    const [speciality,setSpeciality] = useState('');
    const [displayMsg,setDisplayMsg] = useState(false);
    const [createSuccess,setCreateSuccess] = useState(false);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setName('');
      setSpeciality(0);
      setDisplayMsg(false)
    };
  
    const handleConfirm = async (event) => {
      event.preventDefault();
      console.log(speciality,currentBatch.id,name);
      let newSection = {name,batch_Id:currentBatch.id};
      if(speciality > 0) {
        newSection.speciality_Id = parseInt(speciality); 
      }
      try {
        console.log(newSection);
          const response = await axios.post(`section/create`,newSection,{
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
  
    useEffect(() => {setDisplayMsg(false)},[name,speciality])

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} size="small" disabled={!Object.keys(currentBatch).length> 0} style= {{boxShadow:'0px 4px 8px rgba(0,122,255,0.2)',borderRadius:'10px',marginRight: 10}}>
        Add Section
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Section</DialogTitle>
        <DialogContent>
            {displayMsg && createSuccess && <Alert severity="success">Section added successfully</Alert>}
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
                {currentBatch.hasSpecialities &&
                    <Box sx={{ minWidth: "200px",marginTop:'10px' }}>
                        <FormControl fullWidth variant="standard">
                            <InputLabel id="demo-simple-select-label" style={{marginLeft:'10px'}}>Speciality</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={speciality}
                            label="Speciality"
                            variant="outlined"
                            onChange={e => setSpeciality(e.target.value)}
                            >
                                {currentBatch.specialities.map(item => {
                                    return <MenuItem value={item.id} key={item.id}>{item.shortName}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                }
              
              <Button type="submit" style={{float:'right',marginTop:'30px'}}>Confirm</Button>
              <Button onClick={handleClose} style={{float:'right',marginTop:'30px'}}>Cancel</Button>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddSection
