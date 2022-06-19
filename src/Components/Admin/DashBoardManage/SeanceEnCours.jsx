import React from 'react'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {Typography,Divider} from "@mui/material";
import Brightness1Icon from '@mui/icons-material/Brightness1';
import axios from '../../../Api/Axios'
import { useState,useEffect } from 'react'
import useStyles from '../../Style'

const SeanceEnCours = () => {
    const classes = useStyles()
    const [courList,setCourList] = useState([]);

  async function getModules() {
    try {
        const response = await axios.get(`lessons/Now`);
        setCourList(response.data.message);
    }catch(err) {
      console.log(err.message);
    }
  }

  useEffect(getModules,[])

  return (
    <div style={{marginLeft:'10px',border:'1px solid #E5E5E5',width:'100%', height:'450px',backgroundColor: 'white',borderRadius:'4px'}}>
    <div className={classes.teacherListHeader}>
      <Typography variant="h6" style={{flex: 1}}>
        Séances en cours
      </Typography>
    </div>
    <Divider />
  <List
    dense
    disablePadding
    sx={{ width: "100%",height: "85%",overflow: "auto",bgcolor: "background.paper"}}
  >
    {courList.length > 0?courList.map((value) => {
      const labelId = `checkbox-list-secondary-label-${value.id}`;
      return (
        <div key={value.id} >
            <ListItem
                key={value.id}
                disablePadding  
            >
                <ListItemButton>
                    <Brightness1Icon style={{color:'#36A324DE',width:'15px',height:'15px'}}/>
                    <ListItemText id={labelId} primary={`${value.module.name}`}  secondary={'Mr.' + ' ' +value.teacher.name + " " + value.teacher.lastName} style = {{marginLeft: '10px',width:'60px'}}/>
                    <ListItemText id={labelId} style={{textAlign: 'center'}} primary={`Salle ${value.sale.name}`} />  
                </ListItemButton>
                </ListItem>
            
        </div>
      );
    }):
      <div style={{textAlign: 'center',marginTop: '30px'}}>
        <Typography variant="h6">
          No session at the moment
        </Typography>
      </div>
    }
    </List>
    </div>
  )
}

export default SeanceEnCours
