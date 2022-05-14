import React from 'react'
import StudentsList from './StudentsList'
import TeacherProfile from '../TeacherMange/TeacherProfile'
import StudentManagement from './StudentManagement'
import StudentInfo from './StudentInfo'
import Header from '../Header'
import { Grid } from '@mui/material'
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
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Header/>
            </Grid>
            <Grid item xs={8} >
                <StudentsList  setStudentObj = {setStudentObj}/>
            </Grid>
            <Grid item xs={4}>
                <TeacherProfile teacherObj = {studentObj} type = {"student"}/>
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