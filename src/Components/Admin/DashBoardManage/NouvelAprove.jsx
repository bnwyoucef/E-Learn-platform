import React from 'react'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {Typography,Divider,Button} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from '../../../Api/Axios'
import { useState,useEffect } from 'react'
import useStyles from '../../Style'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NouvelAprove = ( {teacherObj} ) => {
    const classes = useStyles();
    const [nouvelList,setNouvelList] = useState([]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  async function getNouvelsAprove() {
    try {
      if(!teacherObj) {
        const response = await axios.get(`news/news_to_approve`);
        setNouvelList(response.data.message);
        console.log(response.data.message);
      }
    }catch(err) {
      console.log(err.message);
    }
  }

  async function handleAprove(id) {
    try {
      const response = await axios.get(`news/approve/${id}`);
      console.log(id,response.data.message);
      window.location.reload();
      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(getNouvelsAprove,[])

  return (
    <div style={{border:'1px solid #E5E5E5' ,height:'400px',border: '1px solid #E5E5E5',
        backgroundColor: 'white',marginLeft:'10px',borderRadius:'4px'}}
    >
        <div className={classes.teacherListHeader}>
        <Typography variant="h6" style={{flex: 1}}>
            News to approve
        </Typography>
        </div>
        <Divider />
        <List
            dense
            disablePadding
            sx={{ width: "100%",height: "85%",overflow: "auto",bgcolor: "background.paper"}}
        >
            {nouvelList.map((nouvel) => {
                const labelId = `checkbox-list-secondary-label-${nouvel.new_Id}`;
                return (
                    <div key={nouvel.new_Id} 
                      style={{border: "1px solid #E5E5E5",margin:'5px',borderRadius:'4px'}}
                    >
                        <ListItem
                            key={nouvel.new_Id}
                            disablePadding
                        >
                            <ListItemButton>
                                <ListItemText id={labelId} primary={`${nouvel.object}`}  
                                secondary={`${nouvel.message}`} /> 
                            </ListItemButton>
                            <img src={`http://192.168.43.32:3000/news/files/${nouvel.fileUrl?nouvel.fileUrl:''}`} alt='nouvel' style={{margin:'5px'}} />
                        </ListItem>
                        <Button style={{color:'#2196F3',margin:'5px'}} 
                          onClick={handleClickOpen}
                        >
                          APPROVE
                        </Button>
                        <Dialog
                          open={open}
                          TransitionComponent={Transition}
                          keepMounted
                          onClose={handleClose}
                          aria-describedby="alert-dialog-slide-description"
                        >
                          <DialogTitle>{"Approve News"}</DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                              Are you sure to approve this news..?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Disagree</Button>
                            <Button onClick={() => handleAprove(nouvel.new_Id)}>Agree</Button>
                          </DialogActions>
                        </Dialog>
                    </div>
                );
            })}
            </List>
    </div>
  )
}

export default NouvelAprove
