import React from 'react'
import { Grid } from '@mui/material'
import Header from '../Header'
import TimeTable from './TimeTable'
import SessionManagement from './SessionManagement'
import axios from '../../../Api/Axios'
import {useState,useEffect} from 'react'

function EmploiContent() {
  const [modulesList,setModulesList] = useState([])
  const [teachersList,setTeachersList] = useState([])
  const [groupsList,setGroupsList] = useState([])
  const [sallesList,setSallesList] = useState([])
  
  return (
    <div>
      <Grid container spacing={1} columnSpacing={1} >
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <TimeTable />
        </Grid>
        <Grid item xs={12}>
          <SessionManagement modulesList = {modulesList}
            teachersList={teachersList}
            groupsList={groupsList}
            sallesList={sallesList}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default EmploiContent
