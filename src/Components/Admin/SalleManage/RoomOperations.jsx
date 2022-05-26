import React from 'react'
import RemoveConfirm from '../BatchManage/RemoveConfirm'
import UpdateSalle from './UpdateSalle'

const RoomOperations = ({room,removeId,type,name,theList,setTheList}) => {
  return (
    <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
        <UpdateSalle roomId={removeId} roomNew={room} theList={theList} setTheList={setTheList}/>
        <RemoveConfirm removeId={removeId} type={type} name={name} theList={theList} setTheList={setTheList}/>
    </div>
  )
}

export default RoomOperations