import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from '../../../Api/Axios'

const ApplyUpdateConfirm = ({sessionClicked,moduleOfSession,modulesList,startTime,endTime,  teacherOfModule,teachersList,salleOfSession,sallesList,groupSession,groupsList,enableUpdateBtn}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleUpdateClick = async () => {
        console.log("clicked session is:", sessionClicked);
        let newSession = {day:1,lesson_Type:sessionClicked.lesson_Type}
        if(moduleOfSession){
          let module_Id = modulesList.find(item => item.name === moduleOfSession).id
          newSession.module_Id = module_Id
        }
        if(startTime) {
          newSession.startingTime = startTime.toString().substring(16,21)
        }
        if(endTime) {
          newSession.endingTime = endTime.toString().substring(16,21)
        }
        if(teacherOfModule) {
          let teacher_Id = parseInt(teachersList.find(item => item.name === teacherOfModule).id)
          newSession.teacher_Id = teacher_Id
        }
        if(salleOfSession) {
          let sale_Id = sallesList.find(item => item.name === salleOfSession).id
          newSession.sale_Id = sale_Id
        }
        if(groupSession) {
          let group_Id = groupsList.find(item => item.name === groupSession).id
          newSession.group_Id = group_Id
        }
    
        try {
          const response = await axios.patch(`lessons/update/${sessionClicked.id}`,newSession)
          console.log("update status:",response.data.message);
          setTimeout(handleClose,500)
        } catch (error) {
          
        }
      }

  return (
    <div>
        <Button variant="contained" disabled={!enableUpdateBtn} onClick={handleClickOpen} size="small" style= {{boxShadow:'0px 4px 8px rgba(0,122,255,0.2)',borderRadius:'10px',marginRight: 10}}>
            Update
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
          <Button onClick={handleUpdateClick} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ApplyUpdateConfirm
