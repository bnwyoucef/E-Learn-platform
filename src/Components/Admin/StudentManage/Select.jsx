import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect( {ChoseList,choseType,setLevel,setSpeciality,setSection} ) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
      switch(choseType) {
        case 'Levels':
            setLevel(event.target.value)
            break;
        case 'Section':
            setSection(event.target.value)
            break;
        case 'speciality':
            setSpeciality(event.target.value)
            break;
        default:
            break;
      }
    setAge(event.target.value);
  };

  return (
    <Box sx={{ width: 120,marginRight:'13px' }}>
      <FormControl fullWidth  size="small" >
        <InputLabel id="demo-simple-select-label">{choseType}</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label={choseType}
            onChange={handleChange}
        >
           {ChoseList.map((item,index) => {
                return <MenuItem value={item.name} key={index}>{choseType === "speciality" ?item.shortName:item.name}</MenuItem>
            })}
        </Select>
      </FormControl>
    </Box>
  );
}