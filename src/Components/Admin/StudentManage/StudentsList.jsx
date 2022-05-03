import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {Avatar,Typography,Divider} from "@mui/material";
import axios from '../../../Api/Axios'
import { useState,useEffect } from 'react'
import useStyles from '../../Style'
import AddTeacherForm from '../AddTeacherForm'
import RemoveTeacher from '../RemoveTeacher'
import Select from './Select'

const StudentsList = ( {setStudentObj} ) => {
    const classes = useStyles()
    const [studentsList,setStudentsList] = useState([])
    const [searchedValue,setSearchedValue] = useState('')
    const [searchedList,setSearchedList] = useState([])
    const listBatch = [2019,2020,2021,2022]
    const listLevel = ['1CP','2CP','1CS','2CS','3CS']
    const listSection = ['A','B']
    const [level,setLevel] = useState('')
    const [batch,setBatch] = useState('')
    const [section,setSection] = useState('')

    function compare( a, b ) {
      if ( a.name.toUpperCase() < b.name.toUpperCase() ){
        return -1;
      }
      if ( a.name.toUpperCase() > b.name.toUpperCase() ){
        return 1;
      }
      return 0;
    }
    console.log(level,batch,section);
    async function getStudents() {
      try {
        const response = await axios.get('student/all')
        setStudentsList(response.data.message.sort(compare))
        setSearchedList(response.data.message.sort(compare))
      }catch(err) {
        console.log(err.message);
      }
    }
  
    useEffect(getStudents,[]) //get teacher from DB when reload the page

    /** get the searched teacher by name when the user typing in the search field **/
    useEffect(() => {
      const handleSearch = (inputValue) => {
        const resultSearch = studentsList.filter((item) => { return (item.name.toUpperCase().includes(inputValue.toUpperCase() )
        || item.lastName.toUpperCase().includes(inputValue.toUpperCase()))})
        setSearchedList([...resultSearch])
      }
      handleSearch(searchedValue)
    },[searchedValue])

  return (
    <div style= {{overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '50vh'}}>
      <div className={classes.teacherListHeader}>
        <Typography variant="h6" style={{flex: 1}}>
          Students
        </Typography>
        <div style={{flex: 2,display: 'flex',justifyContent: 'space-around'}}>
            <Select ChoseList = {listLevel} choseType= {'Levels'} setLevel = {setLevel}/>
            <Select ChoseList = {listBatch} choseType={'Batches'} setBatch = {setBatch}/>
            <Select ChoseList = {listSection} choseType={'Section'} setSection = {setSection}/>
        </div>
        <div style={{flex: 1,display: 'flex',flexDirection: 'row',justifyContent: 'flex-end'}}>
          <AddTeacherForm />
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
      {searchedList.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.id}`;
        return (
          <ListItem
            key={value.id}
            onClick={e => setStudentObj(value)}
            secondaryAction={<RemoveTeacher teacherId={value.id} fullName = {value.name + ' ' + value.lastName} />}
            disablePadding
            
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>{value.name.charAt(0).toUpperCase()}</Avatar>
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value.name + ' ' + value.lastName}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </div>
  )
}

export default StudentsList