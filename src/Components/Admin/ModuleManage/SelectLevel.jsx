import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from '../../../Api/Axios'

const SelectLevel = ({setLevelNumber}) => {

    const [levelList,setLevelList] = React.useState([])
    const [cuLevel,setCuLevel] = React.useState('')
    async function getLevelsList() {
        try {
            const response = await axios.get('level/all')
            setLevelList(response.data.message)
        } catch (error) {
            
        }
    }
    function handleChange(event) {
        setCuLevel(event.target.value)
        let currentLevel = levelList.find(item => item.name === event.target.value) 
        setLevelNumber(currentLevel.id)
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
        </Box>
    </div>
  )
}

export default SelectLevel
