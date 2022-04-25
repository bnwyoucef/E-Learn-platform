import React from 'react'
import TeacherList from './TeacherList'
import TeacherProfile from './TeacherProfile'
import ModuleList from './ModuleList'
import { Grid,Typography  } from '@mui/material'

const AdminContent = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{backgroundColor:'white',borderRadius: '10px',height:'15vh',display: 'flex',alignItems: 'center'}}>
          <img src={`${require('../../images/Logo_png.png')}`} alt="logo classtek" style={{marginLeft:'10px'}}/>
          <Typography variant="h5" style={{marginLeft:'auto',marginRight: '20px',color:'#266fff'}}>
            CLASSTEK
          </Typography>
          </div>
        </Grid>
        <Grid item xs={8} >
          <TeacherList />
        </Grid>
        <Grid item xs={4}>
          <TeacherProfile />
        </Grid>
        <Grid item xs={12}>
          <ModuleList />
        </Grid>
      </Grid>
    </div>
  )
}

export default AdminContent
