import React from 'react'
import useStyles from '../../Style'


const NouvelHeader = ( { nouvel,description } ) => {
    const classes = useStyles()
  return (
    <div>
        <div className={classes.nouvelHeader} >
            <h2 style={{color:'#9E9E9E',fontSize:'24px'}}>{nouvel}</h2>
            <p style={{color:'rgba(0, 0, 0, 0.24)',marginTop:'-10px',fontSize:'12px'}}>{description}</p>
        </div>
    </div>
  )
}

export default NouvelHeader
