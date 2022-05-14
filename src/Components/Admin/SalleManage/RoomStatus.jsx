import React from 'react'
import {Button,Typography,Divider} from "@mui/material";
import useStyles from '../../Style'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import RemoveConfirm from '../BatchManage/RemoveConfirm'
import { useState,useEffect } from 'react'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import axios from '../../../Api/Axios'
import AddRoom from './AddRoom'
import RoomOperations from './RoomOperations'

const RoomStatus = () => {
    const classes = useStyles()
    const [saleList,setSaleList] = useState([])

    useEffect(() => {
        const getSalles = async () => {
            try {
                const response = await axios.get('sale/all')
                setSaleList(response.data.message)
                console.log(response.data.message)  
            }catch (e) {
                console.log(e.message);
            }
        }

        getSalles();
    },[])

  return (
    <div style= {{marginLeft:'10px',overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '600px',overflow:'auto',border:'1px solid #E5E5E5'}}>
        <div className={classes.teacherListHeader}>
            <Typography variant="h6" style={{flex: 1}}>
                Rooms
            </Typography>
            <div style={{flex: 1,display: 'flex',flexDirection: 'row',justifyContent: 'flex-end'}}>
                <AddRoom />
            </div>
        </div>
        <Divider />
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
        {saleList.map((room) => {
            const labelId = `checkbox-list-secondary-label-${room.id}`;
            return (
            <ListItem
                key={room.id}
                secondaryAction={<RoomOperations removeId = {room.id} type= {'sale'} name= {room.name}/>}
                disablePadding  
            >
                <ListItemButton>
                <ListItemAvatar>
                    <MeetingRoomIcon style = {{color:'#3282B8',marginLeft:'10px'}}/>
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${room.name}`} secondary={`capacity: ${room.capacity}`}/>
                <ListItemText id={labelId} primary={`Has Datashow: ${room.hasDataShow}`}/>
                </ListItemButton>
            </ListItem>
            );
        })}
        </List>
    </div>
  )
}

export default RoomStatus
