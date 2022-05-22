import React from 'react'
import { Grid } from '@mui/material'
import Header from '../Header'
import TimeTable from './TimeTable'
import SessionManagement from './SessionManagement'
import axios from '../../../Api/Axios'
import {useState,useEffect} from 'react'

function EmploiContent() {
  const [modulesListUpdate,setModulesListUpdate] = useState([])
  const [groupsListUpdate,setGroupsListUpdate] = useState([])

  const [sessionClicked,setSessionClicked] = useState({})
  
  return (
    <div>
      <Grid container spacing={1} columnSpacing={1} >
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <TimeTable setSessionClicked={setSessionClicked}
            setModulesListUpdate={setModulesListUpdate}
            setGroupsListUpdate={setGroupsListUpdate}
          />
        </Grid>
        <Grid item xs={12}>
          <SessionManagement 
            sessionClicked={sessionClicked}
            modulesList = {modulesListUpdate}
            groupsList={groupsListUpdate}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default EmploiContent
