import React from 'react'
import {Button,Typography} from "@mui/material";
import useStyles from '../../Style'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import RemoveConfirm from './RemoveConfirm'
import AddSection from './AddSection';
import { useState,useEffect } from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
import axios from '../../../Api/Axios'

const SectionControl = ( {currentBatch,setCurrentSection} ) => {
    const classes = useStyles()
    const [sectionList,setSectionList] = useState([]);

    useEffect(() => {
        const getSections = async () => {
            if(Object.keys(currentBatch).length > 0) {
              setSectionList(currentBatch.sections);
            }
        }

        getSections();
    },[currentBatch]);

    useEffect(() => {
      setCurrentSection({});
    },[sectionList]);

  return (
    <div style= {{marginLeft:'10px',overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '50vh',border:'1px solid #E5E5E5'}}>
        <div className={classes.teacherListHeader}>
            <Typography variant="h6" style={{flex: 1}}>
                Sections
            </Typography>
            <AddSection theList={sectionList} setTheList={setSectionList} currentBatch={currentBatch}/>
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
      {Object.keys(currentBatch).length > 0 ? 
      sectionList?sectionList.length?sectionList.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.id}`;
        return (
          <ListItem
            key={value.id}
            secondaryAction={<RemoveConfirm removeId = {value.id} type= {'section'} name= {value.name}
            theList={sectionList} setTheList={setSectionList}/> } 
            disablePadding
            onClick={e => setCurrentSection(value)}  
          >
            <ListItemButton>
              <ListItemAvatar>
                <GroupsIcon style = {{color:'#3282B8'}}/>
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value.name}`} secondary={value.shortName?currentBatch.level.name+ ' ' +value.shortName:currentBatch.level.name}/>
            </ListItemButton>
          </ListItem>
        );
      }):<div style={{display: 'flex',justifyContent: 'center'}}>
      <Typography variant="subtitle2">
        No section attached
      </Typography>
      </div>
      :<div style={{display:'flex',justifyContent: 'center'}}>
          <Typography variant="subtitle2">
            please select the batch
          </Typography>
        </div>:''}
    </List>
    </div>
  )
}

export default SectionControl