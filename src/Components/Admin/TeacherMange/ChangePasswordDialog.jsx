import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PasswordView from '../../PasswordView'
import Alert from '@mui/material/Alert';
import { useState,useEffect } from 'react'
import axios from '../../../Api/Axios'

export default function ChangePasswordDialog({teacherId}) {
  const [open, setOpen] = useState(false);
  const [newPassword,setNewPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
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
      try {
          if(newPassword === confirmPassword) {
              const response = await axios.patch(`teacher/update/${teacherId}`,{password:newPassword})
              setCreateSuccess(response.data.success)
              console.log(response.data.message);
              setDisplayMsg(true)
              setTimeout(() => {
                handleClose()
                window.location.reload();
            },1000)
          }else {
            setCreateSuccess(false)
            setDisplayMsg(true)

          }
      } catch (error) {
        setDisplayMsg(true)
      }
  }

  useEffect(() => {setDisplayMsg(false)},[newPassword,confirmPassword])

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} style={{boxShadow:'0px 4px 8px rgba(0,122,255,0.2)',borderRadius:'10px',marginTop: 30}}>
        Change Password
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
            {displayMsg && createSuccess && <Alert severity="success">password updated successfully</Alert>}
            {displayMsg && !createSuccess && <Alert severity="error">Oops Something went wrong!</Alert>}
            <form onSubmit={handleConfirm}>
                <PasswordView newPassword = {newPassword} setNewPassword={setNewPassword} first= {true}/>
                <PasswordView confirmPassword = {confirmPassword} setConfirmPassword={setConfirmPassword} first= {false}/>

                <Button type="submit" style={{float:'right',marginTop:'30px'}}>Confirme</Button>
                <Button onClick={handleClose} style={{float:'right',marginTop:'30px'}}>Cancel</Button>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}