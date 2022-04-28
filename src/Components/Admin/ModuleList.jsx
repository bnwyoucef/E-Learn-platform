import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {Typography,Divider} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from '../../Api/Axios'
import { useState,useEffect } from 'react'
import BookIcon from '@mui/icons-material/Book';
import useStyles from '../Style'

const ModuleList = ( {teacherObj} ) => {
    const classes = useStyles()
    const [moduleList,setModuleList] = useState([])

  async function getModules() {
    try {
      console.log(teacherObj);
      if(!teacherObj) {
        const response = await axios.get(`teacher/modulesOfTeacher/${teacherObj.id}`)
        setModuleList(response.data.message)
      }
    }catch(err) {
      console.log(err.message);
    }
  }

  useEffect(getModules,[])
  return (
    <div style= {{overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '40vh'}}>
    <div className={classes.teacherListHeader}>
      <Typography variant="h6" style={{flex: 1}}>
        Modules
      </Typography>
    </div>
    <Divider style={{marginBottom: '10px'}}/>

  <List
    dense
    disablePadding
    sx={{ width: "100%",height: "85%",overflow: "auto",bgcolor: "background.paper"}}
  >
    {moduleList.map((value) => {
      const labelId = `checkbox-list-secondary-label-${value.id}`;
      return (
        <div key={value.id}>
            <ListItem
                key={value.id}
                secondaryAction={<MoreVertIcon />}
                disablePadding
            >
                <ListItemButton>
                    <BookIcon color='primary'/>
                    <ListItemText id={labelId} primary={`${value.name}`} style = {{marginLeft: '10px'}}/>
                </ListItemButton>
                </ListItem>
            <Divider style={{margin: '10px'}}/>
        </div>
      );
    })}
    </List>
    </div>
);
}

export default ModuleList
