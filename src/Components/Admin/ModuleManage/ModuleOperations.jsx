import React from 'react'
import RemoveModule from './RemoveModule'
import UpdateModule from './UpdateModule'

const ModuleOperations = ({module,removeId,name,theList,setTheList}) => {
  return (
    <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
        <UpdateModule moduleId={removeId} newModule={module} theList={theList} setTheList={setTheList}/>
        <RemoveModule removeId={removeId} name={name} theList={theList} setTheList={setTheList}/>
    </div>
  )
}

export default ModuleOperations
