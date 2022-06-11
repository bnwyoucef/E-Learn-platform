import React from 'react'
import {Typography} from "@mui/material";
import axios from '../../../Api/Axios'
import { useState,useEffect } from 'react';

const StudentInfo = ({studentObj,levelSelected}) => {
  const [batchesList,setBatchesList] = useState([])
  const [level,setLevel] = useState('')
  
  async function getBatches() {
    try {
      const response = await axios.get('batch/all')
      setBatchesList(response.data.message)
    } catch (error) {
      
    }
  }

  useEffect(()=> {
    getBatches()
  },[])

  useEffect(() =>{
    if(levelSelected) {
      setLevel(levelSelected)
    }else {
      if(Object.keys(studentObj).length !== 0) {
        let curBatch = batchesList.find(item => item.id == studentObj.section.batch_Id)
        console.log("problem is:",studentObj.section);
        if(curBatch)
        setLevel(curBatch.level.name) 
      }
    }
  },[studentObj])


  return (
    <div style= {{overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '220px',border:'1px solid #E5E5E5'}}>
      <div style={{height: '25%',display:'flex',alignItems: 'center',marginLeft: 10,}}>
          <Typography variant="h6">
            Student Info
          </Typography>
      </div>
      <div style={{display:'flex',flexDirection: 'column',alignItems:'center'}}>
        <div style={{backgroundColor:'rgba(15, 76, 117, 0.07)',width:'70%',borderRadius:'10px',textAlign:'center'}}>
            <Typography variant="subtitle2" style={{marginLeft:'10px',color:'rgba(15, 76, 117, 0.6)',padding:'5px 0px'}}>
                {level}
            </Typography>
        </div>
        <div style={{backgroundColor:'rgba(15, 76, 117, 0.07)',width:'70%',borderRadius:'10px',marginTop:'20px',textAlign:'center'}}>
            <Typography variant="subtitle2" style={{marginLeft:'10px',color:'rgba(15, 76, 117, 0.6)',padding:'5px 0px'}}>
                {studentObj?studentObj.section?studentObj.section.name:'':''}
            </Typography>
        </div>
        <div style={{backgroundColor:'rgba(15, 76, 117, 0.07)',width:'70%',borderRadius:'10px',marginTop:'20px',textAlign:'center'}}>
            <Typography variant="subtitle2" style={{marginLeft:'10px',color:'rgba(15, 76, 117, 0.6)',padding:'5px 0px'}}>
                {studentObj?studentObj.section?studentObj.group.name:'':''}
            </Typography>
        </div>
      </div>
    </div>
  )
}

export default StudentInfo
