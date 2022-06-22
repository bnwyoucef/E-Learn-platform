import React from 'react'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {Typography,Divider,Button} from "@mui/material";
import './style.css'
import DeleteSession from './DeleteSession'
import AddSession from './AddSession'

const DaySessions = ({dayName,dayList,setDayList,groupsList,modulesList,section_Id,semester,setSessionClicked}) => {
  
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
                onClick={() =>setSessionClicked(lesson)}
              >
                <ListItemButton style={{display: 'flex',flexDirection:'column'}}>
                  {<ListItemText style={{textAlign: 'center',color: '#3282B8'}} id={labelId} primary={lesson.group?lesson.group.name +' ' +lesson.lesson_Type:lesson.lesson_Type} />}
                  <ListItemText style={{textAlign: 'center'}} id={labelId} primary={`${lesson.module.name + ' ' + 'Mr.' +lesson.teacher.name}`} />
                  <ListItemText style={{textAlign: 'center',color: '#3282B8'}} id={labelId} primary={`${lesson.startingTime + ' - ' + lesson.endingTime}`} />
                  <div style={{width:'100%',display: 'flex',marginBottom:'10px' }}>
                    <ListItemText style={{textAlign: 'center',color: '#3282B8'}} id={labelId} primary={lesson.sale.name} />
                    <DeleteSession sessionId={lesson.id} 
                      theList={dayList}
                      setTheList={setDayList}
                    />
                  </div>
                </ListItemButton>
              </ListItem>
                <Divider />
            </div>
          );
        })}
      </List>
      <AddSession 
        style={{width: '100%',position:'absolute',bottom: '0px',color:'#3282B8'}}
        groupsList={groupsList}
        modulesList={modulesList}
        section_Id={section_Id}
        semester={1}
        dayName={dayName}
        theList={dayList}
        setTheList={setDayList}
      />

      </div>
    );
}

export default DaySessions
