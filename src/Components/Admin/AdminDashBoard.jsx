import React from 'react'
import { Grid } from '@mui/material'
import AdminSideBar from './AdminSideBar'
import TeacherContent from './TeacherContent'
import StudentContent from './StudentManage/StudentContent'
import BatchContent from './BatchManage/BatchContent'
import { useState } from 'react'

const AdminDashBord = () => {
  const [browse,setBrowse] = useState('gestion des enseignants')
  function broswsingPage(page) {
    switch(page) {
      case 'gestion des enseignants':
        return  <TeacherContent />
      case 'gestion des étudiants':
        return <StudentContent />
      case 'Gestion des Salles':
        return <BatchContent />
      default: 
        return
    }
  }
  return (
    <div>
      <Grid container >
        <Grid item xs={2.1} >
          <AdminSideBar setBrowse={setBrowse}/>
        </Grid>
        <Grid item xs={9.9} >
          {broswsingPage(browse)}
        </Grid>
      </Grid>
    </div>
  )
}

export default AdminDashBord
