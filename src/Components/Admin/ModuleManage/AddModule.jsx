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


const AddModule = ({theList,setTheList,setLoading,loading}) => {

    const [open, setOpen] = useState(false);
    const [name,setName] = useState('')
    const [shortName,setShortName] = useState('')
    const [description,setDescription] = useState('')
    const [coef,setCoef] = useState('')
    const [levelId,setLevelId] = useState(0);
    const [specialityId,setSpecialityId] = useState(0)
    const [semesterNum,setSemesterNum] = useState(0)
    const [displayMsg,setDisplayMsg] = useState(false);
    const [createSuccess,setCreateSuccess] = useState(false);
    const [fileToUpload, setFileToUpload] = useState(null);
   
    
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
  
    async function handleConfirm(event){
      event.preventDefault();
      setLoading(true);
      const level_Id = parseInt(levelId)
      const semester = parseInt(semesterNum)
      const coeff = parseInt(coef)
      const speciality_Id = parseInt(specialityId)

      const fd = new FormData()
      fd.append("image",fileToUpload);
      fd.append("level_Id",level_Id.toString())
      fd.append("semester", semester.toString());
      fd.append("name", name);
      fd.append("shortName", shortName);
      fd.append("description", description);
      fd.append("coef", coeff.toString());
      if(speciality_Id) fd.append("speciality_Id", speciality_Id.toString());
      
      try {
          const response = await axios.post(`module/create`,fd);
              setCreateSuccess(response.data.success)
              setDisplayMsg(true)
              //setTimeout(handleClose,500)
              let newList = [...theList]
              newList.unshift(response.data.message) 
              setTheList(newList)
      } catch (error) {
          console.log('there is prblm: ' + error.message);
          setDisplayMsg(true)
      }
    }
    
  
    useEffect(() => {setDisplayMsg(false)},[name,shortName,description,levelId,semesterNum]);
    const handleFileSelect = (event) => { 
      setFileToUpload(event.target.files[0]);
  }


  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} size="small"
        style= {{boxShadow:'0px 4px 8px rgba(0,122,255,0.2)',borderRadius:'10px',marginRight: 10}}
      >
        Add Module
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Module</DialogTitle>
        <DialogContent>
            {/* {<Reload 
                // style={{
                //   width: '100%',
                //   height: '100%',
                //   position: 'absolute',
                //   top: 0,
                //   left: 0,
                //   zIndex: 10,
                // }}
            />} */}
            {displayMsg && createSuccess && <Alert severity="success">Module added successfully</Alert>}
            {displayMsg && !createSuccess && <Alert severity="error">Oops Something went wrong!</Alert>}
            <form onSubmit={(e) => handleConfirm(e).then(() => {
              setLoading(false)
              handleClose();
              
              }
              )}
              // style={{width: '100%',
              //   height: '100%',
              //   position: 'absolute',
              //   top: 0,
              //   left: 0,
              // }}
              >
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
              <Button
                variant="contained"
                component="label"
                style={{marginTop: '10px'}}
                >
                Choose Image
                <input
                    accept="image/*"
                    type="file"
                    hidden
                    onChange={e => handleFileSelect(e)}
                />
                </Button>
              
              <Button type="submit" style={{float:'right',marginTop:'30px'}}>Confirm</Button>
              <Button onClick={handleClose} style={{float:'right',marginTop:'30px'}}>Cancel</Button>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddModule
