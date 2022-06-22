import React from 'react'
import {Avatar,Drawer,Typography,Toolbar,List,ListItem,ListItemIcon,ListItemText} from '@mui/material';
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
import BookIcon from '@mui/icons-material/Book';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const optionListTop = ["Teachers Management","Students Management","Rooms Management","Batch Management","Time Table","Modules Management"] 

const AdminSideBar = ( {setBrowse} ) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleExit = async () => {
        const loginSucceeded = false
        localStorage.setItem('adminLoginStatus',JSON.stringify({loginSucceeded}));
        handleClose();
        window.location.reload();
    }
    
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
            case 5 :
                return <BookIcon/>
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
                    Admin
                </Typography>
            </Toolbar>
            <List 
                sx={{marginTop:'20px',
                    paddingLeft:'5px',
                    paddingRight:'5px',
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
                '& .MuiListItem-root:active': {
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
            
            <List style={{ marginTop:'auto',marginBottom:'10px'}}
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
            <ListItem button
                >
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Exit
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            are you sure to Exit the application?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleExit} autoFocus>
                            Confirm 
                        </Button>
                        </DialogActions>
                    </Dialog>
                    <ListItemIcon >
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Exit'} onClick={handleClickOpen}/>
                </ListItem>
            </List>
        </Drawer>
    </div>
  )
}

export default AdminSideBar
