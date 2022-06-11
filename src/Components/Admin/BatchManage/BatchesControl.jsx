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
import axios from '../../../Api/Axios'

function BatchesControl( {setCurrentBatch} ) {

    const classes = useStyles()
    const [batchList,setBatchList] = useState([]);

    useEffect(() => {
        const getBatches = async () => {
            try {
                const response = await axios.get('batch/all')
                setBatchList(response.data.message)
            }catch (e) {
                console.log(e.message);
            }
        }

        getBatches();
    },[])

  return (
    <div style= {{overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '50vh',border:'1px solid #E5E5E5'}}>
        <div className={classes.teacherListHeader}>
            <Typography variant="h6" style={{flex: 1}}>
                Batches
            </Typography>
            <div style={{flex: 1,display: 'flex',flexDirection: 'row',justifyContent: 'flex-end'}}>
                <Button variant="contained" size="small" style={{borderRadius:'10px',marginRight: 10,backgroundColor:'#007AFF',boxShadow:'0px 4px 8px rgba(0,122,255,0.2)'}}>add Batch</Button>
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
      {batchList.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.id}`;
        return (
          <ListItem
            key={value.id}
            onClick={e => setCurrentBatch(value)}
            secondaryAction={<RemoveConfirm removeId = {value.id} type= {'batch'} name= {value.name}/>}
            disablePadding  
          >
            <ListItemButton>
              <ListItemAvatar>
                <GroupsIcon style = {{color:'#3282B8'}}/>
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value.name}`} secondary={value.level.name}/>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </div>
  )
}

export default BatchesControl
