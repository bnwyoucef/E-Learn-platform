import React from 'react'
import Button from '@mui/material/Button';
import { useState,useEffect } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import axios from '../../../Api/Axios'

const ImportFile = ({theList,setTheList}) => {
    const [fileToUpload, setFileToUpload] = useState(null);
    
    const handleFileSelect = (event) => {
      setFileToUpload(event.target.files[0]);
      handleConfirm(event.target.files[0]);
    }
    
    const handleConfirm = async (file) => {
        var formData = new FormData();
        formData.append("file", file);
      try {
          const response = await axios.post(`teacher/addByExcelFile`,formData) //application/json
              console.log(response.data.message);
              let newList = [...theList,...response.data.message]; 
              setTheList(newList);
      } catch (error) {
          console.log('there is prblm: ' + error.message);
      }
    }
  

  return (
    <div>
        <Button
            //endIcon={<FileUploadIcon />}
            variant="contained"
            component="label"
            size="small" style= {{boxShadow:'0px 4px 8px rgba(0,122,255,0.2)',borderRadius:'10px',marginRight: '20px'}}
        >
            Import
            <input
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                type="file"
                hidden
                onChange={e => handleFileSelect(e)}
            />
        </Button>
    </div>
  )
}

export default ImportFile
