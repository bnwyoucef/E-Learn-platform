import React from 'react'
import {Avatar,Drawer,Typography,Toolbar,List,Divider,ListItem,ListItemIcon,ListItemText} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';


const optionListTop = ["Gestion des enseignants","Gestion des étudiants","Gestion des Salles","Emploi du temps","Batch management"]
const optionListBtm = ["Logs","Chat","Paramètres","Exit"] 

const AdminSideBar = ( {setBrowse} ) => {
    const [isHim,setIsHim] = React.useState(true)
    function optionIcon(list,index) {
        switch(index) {
            case 0:
                return list ? <GroupIcon  /> : <AssignmentIcon />
            case 1:
                return list ? <SchoolIcon /> : <ChatIcon />
            case 2:
                return list ? <MeetingRoomIcon /> : <SettingsIcon />
            case 3:
                return list ? <CalendarMonthIcon /> : <LogoutIcon />
            case 4:
                return <StackedBarChartIcon />
            default:
                break;
        }
    }
    
  return (
    <div>
        <Drawer
          PaperProps={{
            sx: {
            backgroundColor: "#007AFF",
            background: 'linear-gradient(177.14deg, #007AFF 78.29%, #BBE1FA 105.35%)',
            color: "white",
            }
        }}
            sx={{
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
            },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar style={{ marginTop:'10px',marginBottom:'10px' }}>
                <Avatar sx={{ bgcolor: 'white',color: '#266fff' }}>N</Avatar>
                <Typography style={{ marginLeft:'10px'}}>
                    user name
                </Typography>
            </Toolbar>
            <List 
                sx={{marginTop:'20px',
                    paddingLeft:'10px',
                    paddingRight:'10px',
                '& .MuiListItem-root': {
                    '&, & .MuiListItemIcon-root': {
                        color: 'white',
                    },
                },
                //change the background color of item when it clicked
                '& .MuiListItem-root:focus': {
                    bgcolor: 'white',
                    borderRadius: '10px',
                    '&, & .MuiListItemIcon-root': {
                        color: '#266fff',
                    },
                },
                }}
            >
                <ListItem button
                    autoFocus
                    onClick={() => setBrowse('dashboard') }
                >
                <ListItemIcon >
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={'Dashboard'} />
                </ListItem>

                {optionListTop.map((text, index) => (
                    <ListItem button key={text}   
                        onClick={() => setBrowse(text) }
                    >
                    <ListItemIcon >
                        {optionIcon(true,index)}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            
            <List style={{ marginTop:'auto',marginBottom:'10px',paddingRight:'10px',paddingLeft:'10px' }}
              sx={{marginTop:'20px',
              '& .MuiListItem-root': {
                  '&, & .MuiListItemIcon-root': {
                      color: 'white',
                  },
              },
              //change the background color of item when it clicked
              '& .MuiListItem-root:focus': {
                  bgcolor: 'white',
                  borderRadius: 2,
                  '&, & .MuiListItemIcon-root': {
                      color: '#266fff',
                  },
              },
              }}
            >
                {optionListBtm.map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon>
                        {optionIcon(false,index)}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    </div>
  )
}

export default AdminSideBar
