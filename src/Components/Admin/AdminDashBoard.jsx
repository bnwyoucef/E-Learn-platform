import React from 'react'
import { Grid } from '@mui/material'
import AdminSideBar from './AdminSideBar'
import TeacherContent from './TeacherMange/TeacherContent'
import StudentContent from './StudentManage/StudentContent'
import BatchContent from './BatchManage/BatchContent'
import DashBoardContent from './DashBoardManage/DashBoardContent'
import SalleContent from './SalleManage/SalleContent'
import EmploiContent from './EmploiTempMange/EmploiContent'
import { useState } from 'react'
import ModuleContent from './ModuleManage/ModuleContent'

const AdminDashBord = () => {
  const [browse,setBrowse] = useState('dashboard')
  function broswsingPage(page) {
    switch(page) {
      case 'dashboard':
        return  <DashBoardContent />
      case 'Teachers Management':
        return  <TeacherContent />
      case 'Students Management':
        return <StudentContent />
      case 'Rooms Management':
        return <SalleContent />
      case 'Batch Management':
        return <BatchContent />
      case 'Time Table':
        return <EmploiContent />
      case 'Modules Management':
        return <ModuleContent/>
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
        <Grid item xs={9.9}>
          {broswsingPage(browse)}
        </Grid>
      </Grid>
    </div>
  )
}

export default AdminDashBord
