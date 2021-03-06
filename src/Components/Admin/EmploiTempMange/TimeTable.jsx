import React from 'react'
import DaySessions from './DaySessions'
import { useState,useEffect } from 'react'
import axios from '../../../Api/Axios'
import useStyles from '../../Style'
import SelectLevel from './SelectLevel'
import SelectSpeciality from './SelectSpeciality'
import SelectSection from './SelectSection'

const TimeTable = ({setSessionClicked,setModulesListUpdate,setGroupsListUpdate,renderUpdate}) => {
  const classes = useStyles()
  const [sundayList,setSundayList] = useState([])
  const [mondayList,setMondayList] = useState([])
  const [tuesdayList,setTuesdayList] = useState([])
  const [wednesdayList,setWednesdayList] = useState([])
  const [thursdayList,setThursdayList] = useState([])

  const [levelList,setLevelList] = useState([])
  const [specialitiesList,setSpecialitiesList] = useState([])
  const [sectionsList,setSectionsList] = useState([])

  const [selectedLevel,setSelectedLevel] = useState('')
  const [selectedSection,setSelectedSection] = useState('')
  const [selectedSpeciality,setSelectedSpeciality] = useState('')

  const [groupsList,setGroupsList] = useState([])
  const [modulesList,setModulesList] = useState([])
  const [section_Id,setSection_Id] = useState([])
  const [semester,setSemester] = useState([])

  const [hasSpeciality,setHasSpeciality] = useState(false)
  const [displaySection,setDisplaySection] = useState(false)

  let currentLevel = 0
  let levelNumber = 0
  let specialityNumber = 0
  let sectionNumber = 0

  async function getAllLevels() {
      try {
        const response = await axios.get('level/all/WithDetails')
        setLevelList(response.data.message)
      } catch (error) {
        
      }
  }

  useEffect(()=>{getAllLevels()},[])

  async function getSpecialities(currentLevel) {
    if(currentLevel.hasSpecialities) {
      setHasSpeciality(true)
      setSpecialitiesList(currentLevel.specialities)
      setDisplaySection(false)
    }else {
      if(currentLevel.sections) {
        setSectionsList(currentLevel.sections)
        setHasSpeciality(false)
        setModulesList(currentLevel.modules)
        setModulesListUpdate(currentLevel.modules)
      }
    }
  }

  useEffect(() => {
    currentLevel = levelList.find(item => item.name === selectedLevel)
    if(currentLevel) {
      levelNumber = currentLevel.id
      getSpecialities(currentLevel)
      setSelectedSection('')
    }
  },[selectedLevel])

  async function getSectionOfSpecialities() {
    try {
      const response = await axios.get(`speciality/${specialityNumber}`)
      setSectionsList(response.data.message.sections)
      setModulesList(response.data.message.modules)
      setModulesListUpdate(response.data.message.modules)
    } catch (error) {
      console.log("error in group fetch",error.message);
    }
  }

  useEffect(() => {
    let currentCpeciality = specialitiesList.find(item => item.name === selectedSpeciality)
    if(currentCpeciality) {
      specialityNumber = currentCpeciality.id
      getSectionOfSpecialities()
      setSelectedSection('')
    }
    setDisplaySection(true) 
  },[selectedSpeciality])

  async function getLessons() {
    try {
      let sectionChosed = sectionsList.find(item => item.name === selectedSection)
      const response = await axios.get(`lessons/allOfSection=${sectionChosed.id}/inSemester=1`)
      setSundayList(response.data.message.sunday)
      setMondayList(response.data.message.monday)
      setTuesdayList(response.data.message.tuesday)
      setWednesdayList(response.data.message.wednesday)
      setThursdayList(response.data.message.thursday)
    } catch (error) {
      
    }
  }

  useEffect(() =>{getLessons()},[renderUpdate])

  async function getGroupsOfSection() {
    try {
      const response = await axios.get(`section/${sectionNumber}`)
      setGroupsList(response.data.message.groups)
      setGroupsListUpdate(response.data.message.groups)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getLessons()
    let currentSection = sectionsList.find(item => item.name === selectedSection)
    if(currentSection) {
      sectionNumber = currentSection.id
      setSection_Id(sectionNumber)
      getGroupsOfSection()
    }
  },[selectedSection])

  return (
    <div style= {{marginLeft:'10px',overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '500px',border:'1px solid #E5E5E5'}}>
      <div className={classes.teacherListHeader}>
        <SelectLevel selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} levelList={levelList} sectionsList={sectionsList}/>
       {hasSpeciality && <SelectSpeciality selectedSpeciality={selectedSpeciality} setSelectedSpeciality={setSelectedSpeciality} specialitiesList={specialitiesList}/>} 
       {(displaySection || !hasSpeciality) && <SelectSection selectedSection={selectedSection} setSelectedSection={setSelectedSection} sectionsList={sectionsList}/>}

      </div>
      {selectedSection?
      <div style= {{overflow: 'hidden',backgroundColor: 'white',height: '430px',border:'1px solid #E5E5E5',display: 'flex',justifyContent: 'center'}}>
        <DaySessions dayName={'Sunday'} dayList={sundayList}
          setDayList={setSundayList}
          setSessionClicked={setSessionClicked}
          groupsList={groupsList} modulesList={modulesList}
          section_Id={section_Id} semester={semester}
        /> 
        <DaySessions dayName={'Monday'} dayList={mondayList}
            setDayList={setMondayList}
            setSessionClicked={setSessionClicked}
            groupsList={groupsList} modulesList={modulesList}
            section_Id={section_Id} semester={semester}
        /> 
        <DaySessions dayName={'Tuesday'} dayList={tuesdayList}
            setDayList={setTuesdayList}
            setSessionClicked={setSessionClicked}
            groupsList={groupsList} modulesList={modulesList}
            section_Id={section_Id} semester={semester}
        /> 
        <DaySessions dayName={'Wednesday'} dayList={wednesdayList}
            setDayList={setWednesdayList}
            setSessionClicked={setSessionClicked}
            groupsList={groupsList} modulesList={modulesList}
            section_Id={section_Id} semester={semester}
        />  
        <DaySessions dayName={'Thursday'} dayList={thursdayList}
            setDayList={setThursdayList}
            setSessionClicked={setSessionClicked}
            groupsList={groupsList} modulesList={modulesList}
            section_Id={section_Id} semester={semester}
        /> 
      </div>:
      <h3 style={{textAlign: 'center',marginTop:'180px'}}>Please Select the section</h3>} 
    </div>
  )
}

export default TimeTable
