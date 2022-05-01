import React from 'react'
import {Button,Typography} from "@mui/material";
import useStyles from '../../Style'

const LevelsControl = () => {
    const classes = useStyles()
  return (
    <div style= {{overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '50vh'}}>
        <div className={classes.teacherListHeader}>
            <Typography variant="h6" style={{flex: 1}}>
                Levels
            </Typography>
            <div style={{flex: 1,display: 'flex',flexDirection: 'row',justifyContent: 'flex-end'}}>
                <Button variant="contained" style={{marginRight: 10,backgroundColor:'#007AFF'}}>add level</Button>
            </div>
        </div>
    </div>
  )
}

export default LevelsControl