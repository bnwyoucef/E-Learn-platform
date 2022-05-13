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
import AddStudentForm from './AddStudentForm'
import RemoveTeacher from '../RemoveTeacher'
import Select from './Select'

const StudentsList = ( {setStudentObj} ) => {
    const classes = useStyles()
    const [studentsList,setStudentsList] = useState([])
    const [searchedValue,setSearchedValue] = useState('')
    const [searchedList,setSearchedList] = useState([])
    const [listSpeciality,setListSpeciality] = useState([])
    const [listLevel,setListLevel] = useState([])
    const [listSection,setListSection] = useState([])
    const [level,setLevel] = useState('')
    const [speciality,setSpeciality] = useState('')
    const [section,setSection] = useState('')
    const [bacthId,setBatchId] = useState(-1)
    const [currentLevel,setCurrentLevel] = useState({})
    const [hasSpeciality,setHasSpeciality] = useState(false)
    const [displaySection,setDisplaySection] = useState(false)
    const [counter,setCouter] = useState(1)
    const [specialityId,setSpecialityId] = useState(-1)
    const [groupList,setGroupList] = useState([])
    


    function compare( a, b ) {
      if ( a.name.toUpperCase() < b.name.toUpperCase() ){
        return -1;
      }
      if ( a.name.toUpperCase() > b.name.toUpperCase() ){
        return 1;
      }
      return 0;
    }

    async function getStudents() {
      try {
        const response = await axios.get('student/all')
        setStudentsList(response.data.message.sort(compare))
        setSearchedList(response.data.message.sort(compare))
      }catch(err) {
        console.log(err.message);
      }
    }

    async function getLevels() {
      try {
        const response = await axios.get('level/all')
        console.log(response.data.message)
        setListLevel(response.data.message)
      } catch (error) {
        console.log(error.message);
      }
    }

    async function getSpecialities() {
      try {
        const response = await axios.get(`batch/${bacthId}`)
        setHasSpeciality(response.data.message.hasSpecialities)
        if(response.data.message.hasSpecialities) {
          setListSpeciality(response.data.message.specialities)
          setDisplaySection(false)
          console.log(">>>>>>>>>>>>>.",response.data.message);
        }else { 
          console.log(response.data.message.sections);
          if(response.data.message.sections) {
            setListSection(response.data.message.sections)
          }
        }
      } catch (error) {
        
      }
    }
// handle the first time choice and get the data
    useEffect(() => {
      if(counter == 1) {
        setCouter(counter + 1);
        return
      }
      let currentLevel = listLevel.find(item => item.name === level)
      setCurrentLevel(currentLevel)
      if(currentLevel) {
        setBatchId(currentLevel.currentBatch.id)
        getSpecialities()
      }
    },[level])

    useEffect(() => {
      if(counter == 1) {
        setCouter(counter + 1);
        return
      }
      console.log("exxxxxxxxxxxxxxx",displaySection);
      let currentCpeciality = listSpeciality.find(item => item.name === speciality)
      if(currentCpeciality) {
        setSpecialityId()
        getSectionOfSpecialities()
      }
      setDisplaySection(true)
    },[speciality]) 
  
    useEffect(() => {

    },[section])

    async function getSectionOfSpecialities() {
      try {
        const response = await axios.get(`section/all/batch_Id=${bacthId}&speciality_Id=${specialityId}`)
        //setGroup(response.data.message)
        console.log("fjjjadsfdkfajdfSJKfsfjksd",response.data.message);
      } catch (error) {
        console.log("error iin group fetch",error.message);
      }
    }

    useEffect(() => {
      getLevels()
      getStudents()
    },[]) //get teacher from DB when reload the page

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
            {hasSpeciality && <Select ChoseList = {listSpeciality} choseType={'speciality'} setSpeciality = {setSpeciality}/>}
            {(displaySection || !hasSpeciality) && <Select ChoseList = {listSection} choseType={'Section'} setSection = {setSection}/>}
        </div>
        <div style={{flex: 1,display: 'flex',flexDirection: 'row',justifyContent: 'flex-end'}}>
          <AddStudentForm groupList = {groupList}/>
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
            secondaryAction={<RemoveTeacher teacherId={value.id} fullName = {value.name + ' ' + value.lastName} type = {"student"}/>}
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