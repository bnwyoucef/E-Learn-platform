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

const SeanceEnCours = ( {teacherObj} ) => {
    const classes = useStyles()
    const [moduleList,setModuleList] = useState([])
    const courList = [{module:"Algorithme",teacher:"Mr.Simoh",salle:"salle A1"}
  ,{module:"Reseaux",teacher:"Mr.Azza",salle:"salle S2"}
  ,{module:"IGL",teacher:"Mr.Bensliman",salle:"salle S3"}
  ,{module:"Analyse",teacher:"Mr.Amroune",salle:"salle A2"}]

  async function getModules() {
    try {
      console.log(teacherObj);
      if(!teacherObj) {
        const response = await axios.get(`student/all`)
        setModuleList(response.data.message)
      }
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
    {courList.map((value) => {
      const labelId = `checkbox-list-secondary-label-${value.id}`;
      return (
        <div key={value.salle} >
            <ListItem
                key={value.id}
                disablePadding  
            >
                <ListItemButton>
                    <Brightness1Icon style={{color:'#36A324DE',width:'15px',height:'15px'}}/>
                    <ListItemText id={labelId} primary={`${value.module}`}  secondary={value.teacher} style = {{marginLeft: '10px',width:'60px'}}/>
                    <ListItemText id={labelId} style={{textAlign: 'center'}} primary={`${value.salle}`} />  
                </ListItemButton>
                </ListItem>
            
        </div>
      );
    })}
    </List>
    </div>
  )
}

export default SeanceEnCours
