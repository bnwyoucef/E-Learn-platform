import React from 'react'
import { Grid } from '@mui/material'
import AdminSideBar from './AdminSideBar'
import TeacherContent from './TeacherContent'
import StudentContent from './StudentManage/StudentContent'
import BatchContent from './BatchManage/BatchContent'

const AdminDashBord = () => {
  return (
    <div>
      <Grid container >
        <Grid item xs={2.1} >
          <AdminSideBar />
        </Grid>
        <Grid item xs={9.9} >
          <BatchContent />
        </Grid>
      </Grid>
    </div>
  )
}

export default AdminDashBord
