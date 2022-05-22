import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from '../../../Api/Axios'

const ApplyConfirm = ({studentGroups,studentSections,studentObj,disableApply,group,section}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleApply = async () => {
        let group_Id = studentGroups.find(item => item.name === group).id
        let section_Id = studentSections.find(item => item.name === section).id
        let student = {section_Id,group_Id}
        console.log(student);
        try {
          const response = await axios.patch(`student/update/${studentObj.id}`,student)
          console.log("??",student,response);
          setTimeout(handleClose,500)
        } catch (error) {
          
        }
    }

  return (
    <div>
        <Button onClick={handleClickOpen} variant="contained" size="small" disabled = {disableApply} style= {{boxShadow:'0px 4px 8px rgba(0,122,255,0.2)',borderRadius:'10px',marginRight: 10}}>
            Apply
        </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"are you sure to apply the changes?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            are you sure to apply the changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApply} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ApplyConfirm