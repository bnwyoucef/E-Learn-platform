import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import axios from '../../../Api/Axios'

const RemoveConfirm = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleRemove = async () => {
        try {
            //await axios.delete(`teacher/delete/${teacherId}`)
            handleClose();
            window.location.reload();
        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <div>
        <IconButton aria-label="delete" onClick={handleClickOpen}>
            <DeleteIcon style = {{color: '#CCCCCC'}}/>
        </IconButton>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
            {"Delete teacher"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure to delete  ?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleRemove} autoFocus>
                Confirm
            </Button>
        </DialogActions>
   </Dialog>
    </div>
  )
}

export default RemoveConfirm
