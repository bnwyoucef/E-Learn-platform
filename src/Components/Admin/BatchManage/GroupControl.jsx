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
import GroupsIcon from '@mui/icons-material/Groups';
import AddGroup from './AddGroup';
import axios from '../../../Api/Axios'

const GroupControl = ( {currentSection} ) => {
    const classes = useStyles();
    const [groupList,setGroupList] = useState([]);

    useEffect(() => {
        const getGroups = async () => {
          if(Object.keys(currentSection).length > 0) {
            try {
                const response = await axios.get(`section/${currentSection.id}`);
                setGroupList(response.data.message.groups);
            }catch (e) {
                console.log(e.message);
            }
          }
        }
        getGroups();
    },[currentSection]);

  return (
    <div style= {{overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '50vh',border:'1px solid #E5E5E5'}}>
        <div className={classes.teacherListHeader}>
            <Typography variant="h6" style={{flex: 1}}>
                Groups
            </Typography>
            <AddGroup theList={groupList} setTheList={setGroupList} currentSection={currentSection}/>
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
      {Object.keys(currentSection).length > 0?
      groupList.length > 0?groupList.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.id}`;
        return (
          <ListItem
            key={value.id}
            secondaryAction={<RemoveConfirm removeId = {value.id} type= {'group'} name= {value.name} theList={groupList} setTheList={setGroupList}/>}
            disablePadding  
          >
            <ListItemButton>
              <ListItemAvatar>
                <GroupsIcon style = {{color:'#3282B8'}}/>
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value.name}`} secondary={currentSection.name}/>
            </ListItemButton>
          </ListItem>
        );
      }
      ):<div style={{display: 'flex',justifyContent: 'center'}}>
      <Typography variant="subtitle2">
        No group attached
      </Typography>
      </div>
      :<div style={{display: 'flex',justifyContent: 'center'}}>
          <Typography variant="subtitle2">
            please select the section
          </Typography>
        </div>}
    </List>
    </div>
  )
}

export default GroupControl