import React from 'react'
import { Grid } from '@mui/material'
import Header from '../Header'
import TimeTable from './TimeTable'
import SessionManagement from './SessionManagement'
import Affectation from './Affectation'

function EmploiContent() {
  return (
    <div>
      <Grid container spacing={1} columnSpacing={1} >
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <TimeTable />
        </Grid>
        <Grid item xs={6}>
          <SessionManagement />
        </Grid>
        <Grid item xs={6}>
          <Affectation />
        </Grid>
      </Grid>
    </div>
  )
}

export default EmploiContent
