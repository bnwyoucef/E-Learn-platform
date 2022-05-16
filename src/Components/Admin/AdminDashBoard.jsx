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
      case 'Gestion des enseignants':
        return  <TeacherContent />
      case 'Gestion des étudiants':
        return <StudentContent />
      case 'Gestion des Salles':
        return <SalleContent />
      case 'Batch management':
        return <BatchContent />
      case 'Emploi du temps':
        return <EmploiContent />
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
          {/* //{broswsingPage(browse)} */}
          <EmploiContent />
        </Grid>
      </Grid>
    </div>
  )
}

export default AdminDashBord
