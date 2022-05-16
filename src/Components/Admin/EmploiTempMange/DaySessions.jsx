import React from 'react'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {Typography,Divider,Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import useStyles from '../../Style'
import IconButton from '@mui/material/IconButton';
import './style.css'

const DaySessions = ({dayName,dayList}) => {
    const classes = useStyles()

    let handleAddClick = () => {
      console.log(dayName + 'clicked...');
    }

    let handleDeleteClick = (id) => {
      console.log(dayName + 'Deleted...',id);
    }
  
    return (
      <div style= {{height:'100%',width:'20%',backgroundColor: 'white',border:'1px solid #E5E5E5',overflow: 'hidden',position:'relative'}}>
        <div style={{backgroundColor: 'rgba(15, 76, 117, 0.07)',textAlign: 'center'}}>
          <Typography variant="h6" style={{flex: 1}}>
            {dayName}
          </Typography>
        </div>
      <List
        dense
        disablePadding
        className='listDisableOverfllow'
        sx={{ width: "100%",height: "85%",overflow: "auto",bgcolor: "background.paper",
        //change the background color of item when it clicked
          '& .MuiListItemButton-root:focus': {
            bgcolor: '#7da9ff',
              color: 'white',
          },
        }}
      >
        {dayList.map((lesson) => {
          const labelId = `checkbox-list-secondary-label-${lesson.id}`;
          return (
            <div key={lesson.id}>
              <ListItem
                disablePadding
              >
                <ListItemButton style={{display: 'flex',flexDirection:'column'}}>
                  <ListItemText style={{textAlign: 'center',color: '#3282B8'}} id={labelId} primary={lesson.group.name} />
                  <ListItemText style={{textAlign: 'center'}} id={labelId} primary={`${lesson.module.name + ' ' + 'Mr.' +lesson.teacher.name}`} />
                  <ListItemText style={{textAlign: 'center',color: '#3282B8'}} id={labelId} primary={`${lesson.startingTime + ' - ' + lesson.endingTime}`} />
                  <div style={{width:'100%',display: 'flex',marginBottom:'10px' }}>
                    <ListItemText style={{textAlign: 'center',color: '#3282B8'}} id={labelId} primary={lesson.sale.name} />
                    <IconButton aria-label="delete" style={{color:'#3282B8',position: 'absolute',right: '0'}} onClick={() => handleDeleteClick(lesson.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  

                </ListItemButton>
              </ListItem>
                <Divider />
            </div>
          );
        })}
      </List>
      <Button style={{width: '100%',position:'absolute',bottom: '0px',color:'#3282B8'}} onClick={handleAddClick}>Add session</Button>
      </div>
    );
}

export default DaySessions
