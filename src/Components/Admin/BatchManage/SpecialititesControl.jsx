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
import MenuBookIcon from '@mui/icons-material/MenuBook';
import axios from '../../../Api/Axios'
import AddSpeciality from './AddSpeciality'

const SpecialititesControl = ({currentLevel}) => {
    const classes = useStyles()
    const [specialitiesList,setSpecialitiesList] = useState([])

    useEffect(() => {
        const getSpecialities = async () => {
            try {
                const response = await axios.get('speciality/all')
                setSpecialitiesList(response.data.message)
            }catch (e) {
                console.log(e.message);
            }
        }
        getSpecialities();
    },[])

    useEffect(() => {
      if(Object.keys(currentLevel).length !== 0){
        setSpecialitiesList(currentLevel.specialities)
      } 
    },[currentLevel])

  return (
    <div style= {{overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '50vh',border:'1px solid #E5E5E5'}}>
        <div className={classes.teacherListHeader}>
            <Typography variant="h6" style={{flex: 1}}>
                Specialitites
            </Typography>
            <div style={{flex: 1,display: 'flex',flexDirection: 'row',justifyContent: 'flex-end'}}>
                <AddSpeciality theList={specialitiesList} setTheList={setSpecialitiesList}/>
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
      {specialitiesList.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.id}`;
        return (
          <ListItem
            key={value.id}
            secondaryAction={<RemoveConfirm removeId = {value.id} type= {'speciality'} name= {value.name}theList={specialitiesList} setTheList={setSpecialitiesList}/>}
            disablePadding  
          >
            <ListItemButton>
              <ListItemAvatar>
                <MenuBookIcon style = {{color:'#3282B8'}}/>
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value.name}`} secondary={value.description.substring(0,30)}/>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </div>
  )
}

export default SpecialititesControl
