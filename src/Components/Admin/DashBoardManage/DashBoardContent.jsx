import React from 'react'
import { Grid } from '@mui/material'
import NouvelHeader from './NouvelHeader'
import SeanceEnCours from './SeanceEnCours'
import Calendar from './Calendar'

const DashBoardContent = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <NouvelHeader 
            nouvel = {'Nouvelle'}
            description = {'description'}
          />
        </Grid>
        <Grid item xs={12} sm={4} 
          style={{display: 'flex',justifyContent: 'center'}}
        >
          <NouvelHeader
            nouvel = {'Nouvelle'}
            description = {'description'}
          />
        </Grid>
        <Grid item xs={12} sm={4}
          style={{display: 'flex',justifyContent: 'flex-end'}}
        >
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
        <Grid item xs={12} sm={4}>
          nouvel a aprove
        </Grid>
      </Grid>
    </div>
  )
}

export default DashBoardContent