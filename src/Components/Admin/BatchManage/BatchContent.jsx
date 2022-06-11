import React from 'react'
import { Grid } from '@mui/material'
import Header from '../Header'
import BatchesControl from './BatchesControl'
import LevelsControl from './LevelsControl'
import SpecialititesControl from './SpecialititesControl'
import SectionControl from './SectionControl'
import GroupControl from './GroupControl'

function BatchContent() {

    const [currentLevel,setCurrentLevel] = React.useState({})
    const [currentBatch,setCurrentBatch] = React.useState({});
    const [currentSection,setCurrentSection] = React.useState({}); 

  return (
    <div>
        <Grid container spacing = {1}>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item sm={4}>
                <LevelsControl setCurrentLevel={setCurrentLevel}/>
            </Grid>
            <Grid item sm={4}>
                <SpecialititesControl currentLevel={currentLevel}/>
            </Grid>
            <Grid item sm={4}>
                <BatchesControl setCurrentBatch={setCurrentBatch}/>
            </Grid>
            <Grid item sm={6}>
                <SectionControl currentBatch={currentBatch} setCurrentSection={setCurrentSection}/>
            </Grid>
            <Grid item sm={6}>
                <GroupControl currentSection={currentSection}/>
            </Grid>
        </Grid>
    </div>
  )
}

export default BatchContent