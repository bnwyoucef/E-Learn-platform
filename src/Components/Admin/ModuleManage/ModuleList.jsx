import React from 'react'
import {Typography,Divider} from "@mui/material";
import useStyles from '../../Style'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useState,useEffect } from 'react'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import axios from '../../../Api/Axios'
import AddModule from './AddModule'
import ModuleOperations from './ModuleOperations'
import Reload from '../../Reload';

const ModuleList = () => {
    const classes = useStyles()
    const [modulesList,setModulesList] = useState([])
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        const getSalles = async () => {
            try {
                const response = await axios.get('module/all')
                setModulesList(response.data.message.reverse())  
            }catch (e) {
                console.log(e.message);
            }
        }

        getSalles();
    },[])
  return (
    <div style= {{marginLeft:'10px',overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',overflow:'auto',border:'1px solid #E5E5E5',position:'relative',minHeight:'600px'}}>
        <div className={classes.teacherListHeader}>
            <Typography variant="h6" style={{flex: 1}}>
                Modules management
            </Typography>
            <div style={{flex: 1,display: 'flex',flexDirection: 'row',justifyContent: 'flex-end'}}>
                <AddModule theList={modulesList} setTheList={setModulesList} setLoading={setLoading}
                loading={loading}/>
            </div>
        </div>
        <Divider />
        <List
        dense
        disablePadding
        sx={{ width: "100%",overflow: "auto",bgcolor: "background.paper",
        //change the background color of item when it clicked
            '& .MuiListItemButton-root:focus': {
            bgcolor: '#7da9ff',
                color: 'white',
            },
        }}
        >
        {modulesList.map((module) => {
            const labelId = `checkbox-list-secondary-label-${module.id}`;
            return (
            <ListItem
                key={module.id}
                secondaryAction={<ModuleOperations module={module} removeId = {module.id} name= {module.name} theList={modulesList} setTheList={setModulesList}/>}
                disablePadding  
            >
                <ListItemButton>
                <ListItemAvatar>
                    <MeetingRoomIcon style = {{color:'#3282B8',marginLeft:'10px'}}/>
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${module.name}`} secondary={module.shortName}/>
                </ListItemButton>
            </ListItem>
            );
        })}
        </List>
    </div>
  )
}

export default ModuleList