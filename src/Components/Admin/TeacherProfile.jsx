import React from 'react'
import {Avatar,Typography} from "@mui/material";
import useStyles from '../Style'

const TeacherProfile = () => {

    const classes = useStyles();

  return (
    <div className={classes.teacherprofile}>
      <Avatar sx={{ bgcolor: '#266fff',color: 'white',marginTop:'20px' }}>N</Avatar>
      <Typography color='blue'>
          chenge profile picture
      </Typography>
      <Typography variant="h5">
          user name
      </Typography>
    </div>
  )
}

export default TeacherProfile
