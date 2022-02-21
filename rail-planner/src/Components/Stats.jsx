import React, {useEffect} from 'react'
import { Grid, Stack, Divider } from '@mui/material'

const CardText = ({superlative, text, stat}) => {
  useEffect(() => {
    console.log(stat);
  }, [stat])
  return (
    <div class='stat-text'>
      <h4>{superlative}</h4>
      <p>{text}</p>
      <h4>{stat.text}</h4>
    </div>

  )
}

const Stats = ({origin, destination, tripDuration}) => {
  return (
    <div id='stats-container'>
      <Grid container>
        <Grid item xs={12} md={6}>
        <h4>Statistics</h4>
          <Stack divider={<Divider variant='middle' color='white'/>}>
            <CardText superlative='Speed' text={`The route would connect ${origin} and ${destination} in`} stat={tripDuration} />
            <CardText superlative='Cost Savings' text={`The route would connect ${origin} and ${destination} in`} stat={tripDuration} />
            <CardText superlative='Carbon Savings'text={`The route would connect ${origin} and ${destination} in`} stat={tripDuration} />
          </Stack>
          
          
        </Grid>
        <Grid item xs={12} md={6}>
          <h4>Route Estimator</h4>
        </Grid>
      </Grid>
    </div>
  )
}

export default Stats