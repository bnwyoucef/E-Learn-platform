import React from 'react'
import {Avatar,Typography} from "@mui/material";
import useStyles from '../../Style'
import ChangePasswordDialog from './ChangePasswordDialog'

const TeacherProfile = ({teacherObj: recievedObj,type}) => {
    const classes = useStyles();
    

  return (
    <div className={classes.teacherprofile}>
      <Avatar 
        sx={{ bgcolor: '#266fff',color: 'white',marginTop:'20px',height:'90px',width:'90px'}}     alt="Remy Sharp"
        src={recievedObj.profileImage?`https://schooolsystemmanagement-production.up.railway.app/${type}/profile-images/${recievedObj.profileImage}`:''}
      />
      <div style={{backgroundColor:'rgba(15,76,117,0.07)',width:'90%',borderRadius:'5px',marginTop:'20px'}}>
        <Typography variant="subtitle1" style={{marginLeft:'10px',color:'#266fff'}}>
            First name
        </Typography>
        <Typography variant="subtitle1" style={{marginLeft:'10px',color:'rgba(15, 76, 117, 0.6)'}}>
            {recievedObj.name}
        </Typography>
      </div>
      <div style={{backgroundColor:'rgba(15,76,117,0.07)',width:'90%',borderRadius:'5px',marginTop:'10px'}}>
        <Typography variant="subtitle1" style={{marginLeft:'10px',color:'#266fff'}}>
            Last name
        </Typography>
        <Typography variant="subtitle1" style={{marginLeft:'10px',color:'rgba(15, 76, 117, 0.6)'}}>
            {recievedObj.lastName}
        </Typography>
      </div>
      <div style={{backgroundColor:'rgba(15,76,117,0.07)',width:'90%',borderRadius:'5px',marginTop:'10px'}}>
        <Typography variant="subtitle1" style={{marginLeft:'10px',color:'#266fff'}}>
            Email
        </Typography>
        <Typography variant="subtitle1" style={{marginLeft:'10px',color:'rgba(15, 76, 117, 0.6)'}}>
            {recievedObj.email}
        </Typography>
      </div>
      <ChangePasswordDialog teacherId={recievedObj.id}/>
    </div>
  )
}

export default TeacherProfile
