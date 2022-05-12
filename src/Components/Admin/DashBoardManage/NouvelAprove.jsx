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
    const [nouvelList,setNouvelList] = useState([])

  async function getNouvelsAprove() {
    try {
      console.log(teacherObj);
      if(!teacherObj) {
        const response = await axios.get(`news/news_to_approve`)
        setNouvelList(response.data.message)
      }
    }catch(err) {
      console.log(err.message);
    }
  }

  useEffect(getNouvelsAprove,[])

  return (
    <div style={{border:'1px solid #E5E5E5',width:'100%' ,height:'400px',border: '1px solid #E5E5E5',
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
            {nouvelList.map((nouvel) => {
                const labelId = `checkbox-list-secondary-label-${nouvel.new_Id}`;
                return (
                    <div key={nouvel.new_Id} style={{border: "1px solid #E5E5E5",margin:'5px',borderRadius:'4px'}}>
                        <ListItem
                            key={nouvel.new_Id}
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemText id={labelId} primary={`${nouvel.message}`}  secondary="Discription" /> 
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
