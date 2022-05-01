import React from 'react'
import { Grid,Typography  } from '@mui/material'
import Header from '../Header'
import BatchesControl from './BatchesControl'
import LevelsControl from './LevelsControl'
import SpecialititesControl from './SpecialititesControl'
import SectionControl from './SectionControl'
import GroupControl from './GroupControl'

function BatchContent() {
  return (
    <div>
        <Grid container spacing = {2}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item sm={4}>
                <LevelsControl />
            </Grid>
            <Grid item sm={4}>
                <SpecialititesControl />
            </Grid>
            <Grid item sm={4}>
                <BatchesControl />
            </Grid>
            <Grid item sm={6}>
                <SectionControl />
            </Grid>
            <Grid item sm={6}>
                <GroupControl />
            </Grid>
        </Grid>
    </div>
  )
}

export default BatchContent