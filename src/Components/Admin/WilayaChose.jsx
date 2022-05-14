import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ wilaya, setWilaya }) {
  const wilayas = ["01-Adrar","02-Chlef","03-Laghouat","04-Oum El Bouaghi","05-Batna","06-Béjaïa","07-Biskra", "08-Bechar","09-Blida","10-Bouira","11-Tamanrasset","12-Tbessa","13-Tlemcen","14-Tiaret","15-Tizi Ouzou", "16-Alger","17-Djelfa","18-Jijel","19-Sétif","20-Saïda","21-Skikda","22-Sidi Bel Abbes","23-Annaba","24-Guelma","25-Constantine","26-Medea","27-Mostaganem","28-M'Sila","29-Mascara","30-Ouargla","31-Oran","32-El Bayadh","33-Illizi","34-Bordj Bou Arreridj","35-Boumerdes","36-El Tarf","37-Tindouf","38-Tissemsilt","39-El Oued","40-Khenchela","41-Souk Ahras","42-Tipaza","43-Mila","44-Ain Defla","45-Naama","46-Ain Temouchent","47-Ghardaefa","48-Relizane","49-El M'Ghair","50-El Menia","51-Ouled Djellal","52-Bordj Baji Mokhtar","53-Béni Abbès","54-Timimoun","55-Touggourt","56-Djanet","57-In Salah","58-In Guezzam"]

  return (
    <Box sx={{ minWidth: 120,marginTop:'10px' }}>
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-label" style={{marginLeft:'10px'}}>Wilaya</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={wilaya}
          label="Wilaya"
          variant="outlined"
          onChange={e => setWilaya(e.target.value)}
        >
            {wilayas.map((wilaya,index) => {
                return <MenuItem value={wilaya} key={index}>{wilaya}</MenuItem>
            })}
        </Select>
      </FormControl>
    </Box>
  );
}