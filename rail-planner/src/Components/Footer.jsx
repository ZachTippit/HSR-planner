import React from 'react'
import { Divider, Grid } from '@mui/material'

const Footer = () => {
  return (
    <div id='footer'>
      <Divider variant='middle'/>
      <Grid container justifyContent='space-between' alignItems='center' id='footer-grid'>
        <Grid item xs={12} md={4}>
          <p>Socials</p>
        </Grid>
        <Grid item xs={12} md={4}>
          <p>Copyrights</p>
        </Grid>
        <Grid item xs={12} md={4}>
            <p>Support HSR</p>
        </Grid>
      </Grid>
    </div>
  )
}

export default Footer