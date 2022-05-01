import React from 'react'
import { Typography  } from '@mui/material'

const Header = () => {
  return (
    <div style={{backgroundColor:'white',borderRadius: '10px',height:'15vh',display: 'flex',alignItems: 'center'}}>
    <img src={`${require('../../images/Logo_png.png')}`} alt="logo classtek" style={{marginLeft:'10px'}}/>
    <Typography variant="h5" style={{marginLeft:'auto',marginRight: '20px',color:'#007AFF'}}>
        CLASSTEK
    </Typography>
    </div>
  )
}

export default Header