import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect( {ChoseList,choseType,setLevel,setBatch,setSection} ) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
      switch(choseType) {
        case 'Levels':
            setLevel(event.target.value)
            break;
        case 'Section':
            setSection(event.target.value)
            break;
        case 'Batches':
            setBatch(event.target.value)
            break;
        default:
            break;
      }
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
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
                return <MenuItem value={item} key={index}>{item}</MenuItem>
            })}
        </Select>
      </FormControl>
    </Box>
  );
}