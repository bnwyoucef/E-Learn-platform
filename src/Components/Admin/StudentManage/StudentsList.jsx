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
import AddStudentForm from './AddStudentForm'
import RemoveTeacher from '../TeacherMange/RemoveTeacher'
import Select from './Select'
import ImportStudentsFile from './ImportStudentsFile';

const StudentsList = ( {setStudentObj,setLevelSelected,setStudentGroups,setStudentSections,searchedList,setSearchedList} ) => {
    const classes = useStyles()
    const [studentsList,setStudentsList] = useState([])
    const [searchedValue,setSearchedValue] = useState('')
    const [listSpeciality,setListSpeciality] = useState([])
    const [listLevel,setListLevel] = useState([])
    const [listSection,setListSection] = useState([])
    const [level,setLevel] = useState('') 
    const [speciality,setSpeciality] = useState('')
    const [section,setSection] = useState('')
    let currentLevel = {}
    const [hasSpeciality,setHasSpeciality] = useState(false)
    const [displaySection,setDisplaySection] = useState(false)
    const [groupList, setGroupList] = useState([])
    let batchNumber = 0
    let specialityNumber = 0
    let sectionNumber = 0
    const [enableAddStudent,setEnableAddStudent] = useState(false)
    
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
        console.log("all students:",response.data.message);
      }catch(err) {
        console.log(err.message);
      }
    }
  
    useEffect(() => {
      const handleSearch = (inputValue) => {
        const resultSearch = studentsList.filter((item) => { return (item.name.toUpperCase().includes(inputValue.toUpperCase() )
        || item.lastName.toUpperCase().includes(inputValue.toUpperCase()))})
        setSearchedList([...resultSearch])
      }
      handleSearch(searchedValue)
    },[searchedValue])

    async function getLevels() {
      try {
        const response = await axios.get('level/all')
        setListLevel(response.data.message)
      } catch (error) {
        console.log(error.message);
      }
    }

    async function getSpecialities() {
      try {
        const response = await axios.get(`level/${batchNumber}`)
        setStudentsList(response.data.message.students.sort(compare))
        setSearchedList(response.data.message.students.sort(compare))
        setHasSpeciality(response.data.message.hasSpecialities)
        if(response.data.message.hasSpecialities) {
          setListSpeciality(response.data.message.specialities)
          setDisplaySection(false)
        }else { 
          if(response.data.message.sections) {
            setListSection(response.data.message.sections)
            setStudentSections(response.data.message.sections)
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    useEffect(() => {
      currentLevel = listLevel.find(item => item.name === level);
      if(currentLevel) {
        setLevelSelected(currentLevel.name)
        batchNumber = currentLevel.id
        getSpecialities()
        setEnableAddStudent(false)
      }
    },[level])

    async function getSectionOfSpecialities() {
      try {
        let levelSelected = listLevel.find(item => item.name === level)
        batchNumber = levelSelected.currentBatch.id
        const response = await axios.get(`section/all/batch_Id=${batchNumber}&speciality_Id=${specialityNumber}`)
        setListSection(response.data.message.sections)
        setStudentSections(response.data.message.sections)
        setStudentsList(response.data.message.students.sort(compare))
        setSearchedList(response.data.message.students.sort(compare))
      } catch (error) {
        console.log("error in group fetch",error.message);
      }
    }

    async function getGroupsOfSection() {
      try {
        const response = await axios.get(`section/${sectionNumber}`)
        setGroupList(response.data.message.groups)
        setStudentGroups(response.data.message.groups)
        setStudentsList(response.data.message.students.sort(compare))
        setSearchedList(response.data.message.students.sort(compare))
      } catch (error) {
        console.log(error.message);
      }
    }

    useEffect(() => {
      let currentCpeciality = listSpeciality.find(item => item.name === speciality)
      if(currentCpeciality) {
        specialityNumber = currentCpeciality.id
        getSectionOfSpecialities()
      }
      setDisplaySection(true)
      setEnableAddStudent(false)  
    },[speciality]) 

    useEffect(() => {
      let currentSection = listSection.find(item => item.name === section)
      if(currentSection) {
        sectionNumber = currentSection.id
        getGroupsOfSection()
        setEnableAddStudent(true)
      }
    },[section])

    useEffect(() => {
      getLevels()
      getStudents()
    },[])

  return (
    <div style= {{marginLeft:'10px',overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '400px',border:'1px solid #E5E5E5'}}>
      <div className={classes.teacherListHeader}>
        <Typography variant="h6" style={{marginRight: '20px'}}>
          Students
        </Typography>
        <div style={{flex: 2,display: 'flex',}}>
            <Select ChoseList = {listLevel} choseType= {'Levels'} setLevel = {setLevel}/>
            {hasSpeciality && <Select ChoseList = {listSpeciality} choseType={'speciality'} setSpeciality = {setSpeciality}/>}
            {(displaySection || !hasSpeciality) && <Select ChoseList = {listSection} choseType={'Section'} setSection = {setSection}/>}
        </div>
        <div style={{flex: 1,display: 'flex',flexDirection: 'row',justifyContent: 'center'}}>
          <AddStudentForm groupList = {groupList} enableAddStudent={enableAddStudent} batch_Id={listLevel.find(item => item.name === level)?listLevel.find(item => item.name === level).currentBatch.id:0} theList={searchedList} setTheList={setSearchedList}
          speciality_Idd={listSpeciality.find(item => item.name === speciality)?listSpeciality.find(item => item.name === speciality).id:0}
          section_Id={listSection.find(item => item.name === section)?listSection.find(item => item.name === section).id:0}/>
          <ImportStudentsFile level={level} listLevel={listLevel}/>
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
            secondaryAction={<RemoveTeacher teacherId={value.id} fullName = {value.name + ' ' + value.lastName} type = {"student"} setTheList={setSearchedList} theList={searchedList}/>}
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