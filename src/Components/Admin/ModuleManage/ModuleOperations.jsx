import React from 'react'
import RemoveModule from './RemoveModule'
import UpdateModule from './UpdateModule'

const ModuleOperations = ({module,removeId,name}) => {
  return (
    <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
        <UpdateModule moduleId={removeId} newModule={module}/>
        <RemoveModule removeId={removeId} name={name}/>
    </div>
  )
}

export default ModuleOperations
