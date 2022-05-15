import React from 'react'
import { Grid } from '@mui/material'
import ModuleList from './ModuleList'
import Header from '../Header'

const ModuleContent = () => {
  return (
    <div>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={12}>
                <ModuleList />
            </Grid>
        </Grid>
    </div>
  )
}

export default ModuleContent