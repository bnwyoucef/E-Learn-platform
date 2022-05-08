import React from 'react'
import {Grid} from '@mui/material'
import Header from '../Header'
import RoomStatus from './RoomStatus'
const SalleContent = () => {
  return (
    <div>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={12}>
                <RoomStatus />
            </Grid>
        </Grid>
    </div>
  )
}

export default SalleContent