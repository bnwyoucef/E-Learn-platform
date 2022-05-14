import React from 'react'
import RemoveConfirm from '../BatchManage/RemoveConfirm'
import UpdateSalle from './UpdateSalle'

const RoomOperations = ({removeId,type,name}) => {
  return (
    <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
        <UpdateSalle />
        <RemoveConfirm removeId={removeId} type={type} name={name}/>
    </div>
  )
}

export default RoomOperations