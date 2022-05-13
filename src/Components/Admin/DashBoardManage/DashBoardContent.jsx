import React from 'react'
import { Grid } from '@mui/material'
import NouvelHeader from './NouvelHeader'
import SeanceEnCours from './SeanceEnCours'
import Calendar from './Calendar'
import NouvelAprove from './NouvelAprove'
import axios from '../../../Api/Axios'
import { useState,useEffect } from 'react'

const DashBoardContent = () => {

  const [aprovedNews,setAprovedNews] =  useState([])
  async function getNouvelAproved() {
    try {
      const response = await axios.get("news/approvedNews")
      setAprovedNews(response.data.message)
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
        <Grid item xs={12} sm={4}>
          <NouvelHeader 
            nouvel = {aprovedNews[0]? aprovedNews[0].object:'Nouvel'}
            description = {aprovedNews[0]? aprovedNews[0].message:'Description'}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <NouvelHeader
            nouvel = {aprovedNews[1]? aprovedNews[1].object:'Nouvel'}
            description = {aprovedNews[1]? aprovedNews[1].message:'Description'}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <NouvelHeader             
            nouvel = {aprovedNews[2]? aprovedNews[2].object:'Nouvel'}
            description = {aprovedNews[2]? aprovedNews[2].message:'Description'}
          />
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