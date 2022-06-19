import React from 'react'
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from '../../../Api/Axios';
import TextField from '@mui/material/TextField';
import { useState,useEffect } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {Typography,Button} from "@mui/material";

const Calendar = () => {
    const [currentSemester,setCurrentSemester] = React.useState('');
    const [object,setObject]= useState('');
    const [message,setMessage] = useState('');
    const [imageToUpload,setImageToUpload] = useState(null);

    const handleFileSelect = (event) => {
      setImageToUpload(event.target.files[0]);
    }

    async function handleChange(event) {
      setCurrentSemester(event.target.value);
      try {
        await axios.post(`current-semester/changeTo/${parseInt(event.target.value)}`); 
      } catch (error) {
        console.log(error.message);
      }
    }

    async function getCurrentSemester() {
      try {
        const response = await axios.get(`current-semester`);
        setCurrentSemester(response.data.message);
      }catch (error) {
        console.log(error.message);
      }
    }

    React.useEffect(getCurrentSemester,[]);

    const handleConfirm = async (event) => {
      event.preventDefault();
      const fd = new FormData()
      fd.append("object",object);
      fd.append("message",message)
      fd.append("file", imageToUpload);
      try{
          const response = await axios.post(`news/CreateByAdmin`,fd);
              window.location.reload();
      }
      catch(err){
          console.log(err);
      }
    }
    
    
  return (
    <div style={{border:'1px solid #E5E5E5',width:'99%', height:'450px',backgroundColor: 'white',borderRadius:'4px',marginLeft:'10px',display: 'flex',flexDirection: 'column'}}>
      <Box sx={{ minWidth: 120,margin:'10px'}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Semester</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentSemester}
              label="Semester"
              onChange={e => handleChange(e)}
            >
              <MenuItem value={1}>Semester 01</MenuItem>
              <MenuItem value={2}>Semester 02</MenuItem>
            </Select>
          </FormControl>
      </Box>
      <div style={{border: '1px solid #E5E5E5',margin:'10px'}}>
      <Typography variant="h6" style={{marginLeft:'10px'}}>
        Post News
      </Typography>
       <form onSubmit={handleConfirm} style={{margin:"10px"}}>
              <TextField
                  margin="dense"
                  id="object"
                  label="Object"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                  value= {object}
                  onChange= {e => setObject(e.target.value)}
              />
              <TextField
                  margin="dense"
                  id="message"
                  label="Message"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                  value= {message}
                  multiline={true}
                  rows={3}
                  onChange= {e => setMessage(e.target.value)}
              />
              <Button
                startIcon={<UploadFileIcon />}
                component="label"
                style={{marginTop: "10px",width:'40%'}}
              >
                Upload File
                <input
                    type="file"
                    hidden
                    onChange={e => handleFileSelect(e)}
                />
              </Button>
              <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            </FormControl>
              <Button type="submit" variant="contained" fullWidth style={{ marginTop: "10px"}}>
                Confirm
              </Button>
            </form>
            </div>
    </div>

  )
}

export default Calendar