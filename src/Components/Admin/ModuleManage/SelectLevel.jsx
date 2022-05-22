import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from '../../../Api/Axios'

const SelectLevel = ({setLevelNumber,setSpecialityId}) => {

    const [levelList,setLevelList] = React.useState([])
    const [cuLevel,setCuLevel] = React.useState('')
    const [listSpeciality,setListSpeciality] = React.useState([])
    const [hasSpeciality,setHasSpeciality] = React.useState(false)
    let currentLevel;
    let currentSpeciality;
    async function getLevelsList() {
        try {
            const response = await axios.get('level/all')
            setLevelList(response.data.message)
        } catch (error) {
            
        }
    }

    async function getSpecialities() {
        try {
            const response = await axios.get(`level/${currentLevel.id}`)
            console.log(response)
            setHasSpeciality(response.data.message.hasSpecialities)
            console.log(hasSpeciality)
            if(response.data.message.hasSpecialities) {
                setListSpeciality(response.data.message.specialities)}
                console.log(listSpeciality)
        } catch (error) {
            
        }
    }
    function handleChange(event) {
        setCuLevel(event.target.value)
        currentLevel = levelList.find(item => item.name === event.target.value) 
        getSpecialities()    
        setLevelNumber(currentLevel.id)   
    }

    function handleSpecialityChange(event){
        currentSpeciality = listSpeciality.find(item => item.name === event.target.value)
        setSpecialityId(currentSpeciality.id)
    }

    React.useEffect(() => {
        getLevelsList()
    },[])

  return (
    <div>
        <Box sx={{ minWidth: 120,marginTop:'10px' }}>
        <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-label" style={{marginLeft:'10px'}}>Level</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cuLevel}
            label="Level"
            variant="outlined"
            onChange={handleChange}
            >
                {levelList.map((item,index) => {
                    return <MenuItem value={item.name} key={item.id}>{item.name}</MenuItem>
                })}
            </Select>
        </FormControl>
        {hasSpeciality && <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-label" style={{marginLeft:'10px'}}>Speciality</InputLabel>
            <Select
            style={{marginTop:"10px"}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Speciality"
            variant="outlined"
            onChange={handleSpecialityChange}
            >
                {listSpeciality.map((item) => {
                    return <MenuItem value={item.name} key={item.id}>{item.shortName}</MenuItem>
                })}
            </Select>
        </FormControl>}
        </Box>
    </div>
  )
}

export default SelectLevel
