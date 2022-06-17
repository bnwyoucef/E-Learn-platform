import React from 'react'
import { Grid } from '@mui/material'
import NouvelHeader from './NouvelHeader'
import SeanceEnCours from './SeanceEnCours'
import Calendar from './Calendar'
import NouvelAprove from './NouvelAprove'
import axios from '../../../Api/Axios'
import { useState,useEffect } from 'react'

const DashBoardContent = () => {

  const [aprovedNews,setAprovedNews] =  useState([]);
  const handleDragStart = (e) => e.preventDefault();
  async function getNouvelAproved() {
    try {
      const response = await axios.get("news/approvedNews");
      let items = response.data.message.reverse().map(item => {
        return (
          <div style={{background: 'white',border: '1px solid #E5E5E5',height:'200px',margin:'0 10px',display:'flex',justifyContent: 'center',flexDirection:'column',alignItems:'center',padding:'0 5px'}} onDragStart={handleDragStart} role="presentation">
          <h3>{item.object}</h3>
          <p style={{textAlign: 'center'}}>{item.message}</p>
          </div>
        );
      })
      setAprovedNews(items);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() =>{
    getNouvelAproved()
  },[])


  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} >
          <NouvelHeader newsList={aprovedNews} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <SeanceEnCours />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Calendar />
        </Grid>
        <Grid item xs={12} sm={12} style={{marginTop: 10}}>
          <NouvelAprove />
        </Grid>
      </Grid>
    </div>
  )
}

export default DashBoardContent