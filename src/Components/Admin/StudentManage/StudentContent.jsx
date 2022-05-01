import React from 'react'
import StudentsList from './StudentsList'
import TeacherProfile from '../TeacherProfile'
import StudentManagement from './StudentManagement'
import StudentInfo from './StudentInfo'
import { Grid,Typography  } from '@mui/material'
import { useState,useEffect } from 'react'
import axios from '../../../Api/Axios'

const StudentContent = () => {
    const [studentObj,setStudentObj] = useState({})

    function compare( a, b ) {
        if ( a.name.toUpperCase() < b.name.toUpperCase() ){
        return -1;
        }
        if ( a.name.toUpperCase() > b.name.toUpperCase() ){
        return 1;
        }
        return 0;
    }

    async function getStudents() {
        try {
        const response = await axios.get('student/all')
        setStudentObj(response.data.message.sort(compare)[0])
        }catch(err) {
        console.log(err.message);
        }
    }
  
    useEffect(() => {getStudents()},[])

  return (
    <div>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div style={{backgroundColor:'white',borderRadius: '10px',height:'15vh',display: 'flex',alignItems: 'center'}}>
                <img src={`${require('../../../images/Logo_png.png')}`} alt="logo classtek" style={{marginLeft:'10px'}}/>
                <Typography variant="h5" style={{marginLeft:'auto',marginRight: '20px',color:'#266fff'}}>
                    CLASSTEK
                </Typography>
                </div>
            </Grid>
            <Grid item xs={8} >
                <StudentsList  setStudentObj = {setStudentObj}/>
            </Grid>
            <Grid item xs={4}>
                <TeacherProfile teacherObj = {studentObj}/>
            </Grid>
            <Grid item xs={8}>
                <StudentManagement />
            </Grid>
            <Grid item xs={4}>
                <StudentInfo />
            </Grid>
        </Grid>
    </div>
  )
}

export default StudentContent