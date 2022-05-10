import React from 'react'
import { Grid } from '@mui/material'
import NouvelHeader from './NouvelHeader'
import SeanceEnCours from './SeanceEnCours'
import Calendar from './Calendar'
import NouvelAprove from './NouvelAprove'

const DashBoardContent = () => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <NouvelHeader 
            nouvel = {'Nouvelle'}
            description = {'description'}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <NouvelHeader
            nouvel = {'Nouvelle'}
            description = {'description'}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <NouvelHeader             
            nouvel = {'Nouvelle'}
            description = {'description'}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <SeanceEnCours />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Calendar />
        </Grid>
        <Grid item xs={12} sm={12} style={{marginTop: 10}}>
          <NouvelAprove />
        </Grid>
      </Grid>
    </div>
  )
}

export default DashBoardContent