import React from 'react'
import DaySessions from './DaySessions'
import { useState,useEffect } from 'react'
import axios from '../../../Api/Axios'
import useStyles from '../../Style'
import {Typography} from '@mui/material'
import SelectLevel from './SelectLevel'
import SelectSpeciality from './SelectSpeciality'
import SelectSection from './SelectSection'

const TimeTable = () => {
  const classes = useStyles()
  const [sundayList,setSundayList] = useState([])
  const [mondayList,setMondayList] = useState([])
  const [tuesdayList,setTuesdayList] = useState([])
  const [wednesdayList,setWednesdayList] = useState([])
  const [thursdayList,setThursdayList] = useState([])
  const [selectedLevel,setSelectedLevel] = useState('')
  const [selectedSection,setSelectedSection] = useState('')
  const [selectedSpeciality,setSelectedSpeciality] = useState('')

  async function getLessons() {
    try {
      const response = await axios.get('lessons/allOfSection=1/inSemester=1')
      setSundayList(response.data.message.thursday)
      setMondayList(response.data.message.monday)
      setTuesdayList(response.data.message.tuesday)
      setWednesdayList(response.data.message.wednesday)
      setThursdayList(response.data.message.thursday)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getLessons()
  },[])

  return (
    <div style= {{marginLeft:'10px',overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '500px',border:'1px solid #E5E5E5'}}>
      <div className={classes.teacherListHeader}>
        <SelectLevel selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel}/>
        <SelectSpeciality selectedSpeciality={selectedSpeciality} setSelectedSpeciality={setSelectedSpeciality}/>
        <SelectSection selectedSection={selectedSection} setSelectedSection={setSelectedSection}/>
      </div>
      <div style= {{overflow: 'hidden',backgroundColor: 'white',height: '430px',border:'1px solid #E5E5E5',display: 'flex',justifyContent: 'center'}}>
        <DaySessions dayName={'Sunday'} dayList={sundayList}/> 
        <DaySessions dayName={'Monday'} dayList={mondayList}/> 
        <DaySessions dayName={'Tuesday'} dayList={tuesdayList}/> 
        <DaySessions dayName={'Wednseday'} dayList={wednesdayList}/>  
        <DaySessions dayName={'Thursday'} dayList={thursdayList}/> 
      </div> 
    </div>
  )
}

export default TimeTable
