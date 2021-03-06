import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {Avatar,Typography,Divider} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import axios from '../../../Api/Axios'
import { useState,useEffect } from 'react'
import useStyles from '../../Style'
import AddTeacherForm from './AddTeacherForm'
import RemoveTeacher from './RemoveTeacher'
import ImportFile from "./ImportFile";

export default function TeacherList( {setTeacherObj,searchedList,setSearchedList} ) {

  const classes = useStyles()
  const [teacherList,setTeacherList] = useState([])
  const [searchedValue,setSearchedValue] = useState('')
  // const [searchedList,setSearchedList] = useState([])
  const [changedRender,setChangedRender] = useState(false)

  function compare( a, b ) {
    if ( a.name.toUpperCase() < b.name.toUpperCase() ){
      return -1;
    }
    if ( a.name.toUpperCase() > b.name.toUpperCase() ){
      return 1;
    }
    return 0;
  }

  async function getTeachers() {
    try {
      const response = await axios.get('teacher/all')
      setTeacherList(response.data.message.sort(compare))
      setSearchedList(response.data.message.sort(compare))
    }catch(err) {
      console.log(err.message);
    }
  }

  useEffect(getTeachers,[changedRender]) //get teacher from DB when reload the page
  /** get the searched teacher by name when the user typing in the search field **/
  useEffect(() => {
    const handleSearch = (inputValue) => {
      const resultSearch = teacherList.filter((item) => { return (item.name.toUpperCase().includes(inputValue.toUpperCase() )
      || item.lastName.toUpperCase().includes(inputValue.toUpperCase()))})
      setSearchedList([...resultSearch])
    }
    handleSearch(searchedValue)
  },[searchedValue])

  return (
    <div style= {{marginLeft:'10px',overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '50vh',border:'1px solid #E5E5E5',paddingBottom: '15px'}}>
      <div className={classes.teacherListHeader}>
        <Typography variant="h6" style={{marginRight: '20px'}}>
          Teachers
        </Typography>
        <TextField
          style={{borderRadius:'10px',backgroundColor: 'rgba(15,76,117,0.07)',flex: 2}}
          size="normal"
          border="none"
          placeholder="Search..."
          variant='standard'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{paddingLeft:'10px'}}>
                <SearchIcon />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          value={searchedValue}
          onChange={e => setSearchedValue(e.target.value)}
        />
        <div style={{flex: 1,display: 'flex',flexDirection: 'row',justifyContent: 'center'}}>
          <AddTeacherForm userType = {'teacher'} theList={searchedList} setTheList={setSearchedList}/>
          <ImportFile theList={searchedList} setTheList={setSearchedList}/>
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
      {searchedList?searchedList.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.id}`;
        return (
          <ListItem
            key={value.id}
            onClick={e => setTeacherObj(value)}
            secondaryAction={<RemoveTeacher teacherId={value.id} fullName = {value.name + ' ' + value.lastName} type = {"teacher"} setTheList={setSearchedList} theList={searchedList} />}
            disablePadding
            
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>{value?value.name?value.name.charAt(0).toUpperCase():'':''}</Avatar>
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value.name + ' ' + value.lastName}`} />
            </ListItemButton>
          </ListItem>
        );
      }):''}
    </List>
    </div>
  );
}

