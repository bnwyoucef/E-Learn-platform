import React from 'react'
import {Button,Typography} from "@mui/material";
import useStyles from '../../Style'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import RemoveConfirm from './RemoveConfirm'
import { useState,useEffect } from 'react'
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import axios from '../../../Api/Axios'

const LevelsControl = () => {
    const classes = useStyles()
    const [levelList,setLevelList] = useState([])

    useEffect(() => {
        const getLevels = async () => {
            try {
                const response = await axios.get('level/all')
                setLevelList(response.data.message)
            }catch (e) {
                console.log(e.message);
            }
        }

        getLevels();
    },[])

  return (
    <div style= {{overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '50vh'}}>
        <div className={classes.teacherListHeader}>
            <Typography variant="h6" style={{flex: 1}}>
                Levels
            </Typography>
            <div style={{flex: 1,display: 'flex',flexDirection: 'row',justifyContent: 'flex-end'}}>
                <Button variant="contained" size="small" style={{marginRight: 10,backgroundColor:'#007AFF'}}>add level</Button>
            </div>
        </div>
    <List
      dense
      disablePadding
      sx={{ width: "100%",height: "85%",overflow: "auto",bgcolor: "background.paper",
      //change the background color of item when it clicked
        '& .MuiListItemButton-root:focus': {
          bgcolor: '#7da9ff',
            color: 'white',
        },
      }}
    >
      {levelList.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.id}`;
        return (
          <ListItem
            key={value.id}
            secondaryAction={<RemoveConfirm removeId = {value.id} type= {'level'} name= {value.name}/>}
            disablePadding  
          >
            <ListItemButton>
              <ListItemAvatar>
                <StackedBarChartIcon style = {{color:'#3282B8'}}/>
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value.name}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </div>
  )
}

export default LevelsControl