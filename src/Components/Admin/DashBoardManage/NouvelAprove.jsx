import React from 'react'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {Typography,Divider,Button} from "@mui/material";
import axios from '../../../Api/Axios'
import { useState,useEffect } from 'react'
import useStyles from '../../Style'

const NouvelAprove = ( {teacherObj} ) => {
    const classes = useStyles()
    const [moduleList,setModuleList] = useState([])

  async function getModules() {
    try {
      console.log(teacherObj);
      if(!teacherObj) {
        const response = await axios.get(`news/news_to_approve`)
        console.log(response.data.message);
        setModuleList(response.data.message)
      }
    }catch(err) {
      console.log(err.message);
    }
  }

  useEffect(getModules,[])

  return (
    <div style={{width:'100%', height:'400px',border: '1px solid #E5E5E5',
        backgroundColor: 'white',     borderRadius:'4px'}}
    >
        <div className={classes.teacherListHeader}>
        <Typography variant="h6" style={{flex: 1}}>
            Nouvelles à apprové
        </Typography>
        </div>
        <Divider />
        <List
            dense
            disablePadding
            sx={{ width: "100%",height: "85%",overflow: "auto",bgcolor: "background.paper"}}
        >
            {moduleList.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value.id}`;
                return (
                    <div key={value.id} style={{border: "1px solid #E5E5E5",margin:'5px',borderRadius:'4px'}}>
                        <ListItem
                            key={value.id}
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemText id={labelId} primary={`${value.name}`}  secondary="Discription" /> 
                            </ListItemButton>
                            <img src={'https://picsum.photos/200'} alt='nouvel' style={{margin:'5px'}} />
                        </ListItem>
                        <Button style={{color:'#2196F3',margin:'5px'}}>APPROVé</Button>
                    </div>
                );
            })}
            </List>
    </div>
  )
}

export default NouvelAprove
