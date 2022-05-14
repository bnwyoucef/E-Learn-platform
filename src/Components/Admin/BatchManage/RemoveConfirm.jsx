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
import Tooltip from '@mui/material/Tooltip'; 

const RemoveConfirm = ( {removeId,type,name} ) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleRemove = async () => {
        try {
            await axios.delete(`${type}/delete/${removeId}`)
            handleClose();
            window.location.reload();
        } catch (error) {
            console.log(error.message);
        }
    }

  return (
    <div>
        <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={handleClickOpen} style={{backgroundColor:'#007AFF'}}>
                <DeleteIcon style={{color:"white",width:"20px",height:"20px"}}/>
            </IconButton>
        </Tooltip>
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
                Are you sure to delete {name}?
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
