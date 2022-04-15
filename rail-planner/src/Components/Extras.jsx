import React from 'react'
import { Grid } from '@mui/material'

const Extras = ({checkOriginDest}) => {
  return (
    <Grid container id='act'>
        <Grid item xs={12} md={6}>
            <p>Support American HSR</p>
        </Grid>
        <Grid item xs={12} md={6}>
            <p>Recommended/common lines</p>
            <p><a href='#' onClick={() => checkOriginDest('Chicago', 'New York')}>Chicago to New York</a></p>
            <p><a href='#' onClick={() => checkOriginDest('San Diego', 'Seattle')}>West Coaster</a></p>
            <p><a href='#' onClick={() => checkOriginDest('Los Angeles', 'Chicago')}>Cross Country</a></p>
            <p><a href='#' onClick={() => checkOriginDest('Dallas', 'Mexico City')}>Dallas to Mexico City</a></p>
        </Grid>
    </Grid>
  )
}

export default Extras