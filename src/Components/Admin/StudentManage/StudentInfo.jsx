import React from 'react'
import {Typography} from "@mui/material";


const StudentInfo = () => {

  return (
    <div style= {{overflow: 'hidden',borderRadius: '10px',backgroundColor: 'white',height: '28vh'}}>
      <div style={{height: '25%',display:'flex',alignItems: 'center',marginLeft: 10,}}>
          <Typography variant="h6">
            Student Info
          </Typography>
      </div>
      <div style={{display:'flex',flexDirection: 'column',alignItems:'center'}}>
        <div style={{backgroundColor:'rgba(15, 76, 117, 0.07)',width:'70%',borderRadius:'10px',textAlign:'center'}}>
            <Typography variant="subtitle2" style={{marginLeft:'10px',color:'rgba(15, 76, 117, 0.6)',padding:'5px 0px'}}>
                1CPI
            </Typography>
        </div>
        <div style={{backgroundColor:'rgba(15, 76, 117, 0.07)',width:'70%',borderRadius:'10px',marginTop:'20px',textAlign:'center'}}>
            <Typography variant="subtitle2" style={{marginLeft:'10px',color:'rgba(15, 76, 117, 0.6)',padding:'5px 0px'}}>
                Section A
            </Typography>
        </div>
      </div>
    </div>
  )
}

export default StudentInfo
