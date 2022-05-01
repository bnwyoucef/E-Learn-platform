import React from 'react'
import TeacherList from './TeacherList'
import TeacherProfile from './TeacherProfile'
import ModuleList from './ModuleList'
import { Grid,Typography  } from '@mui/material'
import { useState,useEffect } from 'react'
import axios from '../../Api/Axios'

const TeacherContent = () => {
  const [teacherObj,setTeacherObj] = useState({})

  function compare( a, b ) {
    if ( a.name.toUpperCase() < b.name.toUpperCase() ){
      return -1;
    }
    if ( a.name.toUpperCase() > b.name.toUpperCase() ){
      return 1;
    }
    return 0;
  }

  async function getTeachers() {
    try {
      const response = await axios.get('teacher/all')
      setTeacherObj(response.data.message.sort(compare)[0])
    }catch(err) {
      console.log(err.message);
    }
  }
  
  useEffect(() => {getTeachers()},[])

  
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
          <TeacherList setTeacherObj = {setTeacherObj} />
        </Grid>
        <Grid item xs={4}>
          <TeacherProfile teacherObj = {teacherObj} />
        </Grid>
        <Grid item xs={12}>
          <ModuleList teacherObj = {teacherObj}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default TeacherContent
