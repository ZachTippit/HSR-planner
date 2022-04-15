import React, {useEffect, useState} from 'react'
import { Grid, Stack, Divider } from '@mui/material'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TrainIcon from '@mui/icons-material/Train';
import FlightIcon from '@mui/icons-material/Flight';


const CardText = ({superlative, text, stat}) => {
  useEffect(() => {
    console.log(stat);
  }, [stat])
  return (
    <div class='stat-text'>
      <Grid container>
        <Grid item xs={12}>
         <h4>{superlative}</h4>
         <p>{text}</p>
        </Grid>
        <Grid item xs={6}>
          <div>
            <p>By car</p>
          </div>
         <h4>{stat.text}</h4>
        </Grid>
        <Grid item xs={6}>
         <p>By train</p>
         <h4>{stat.text}</h4>
        </Grid>
      </Grid>
    </div>
  )
}

const SpeedText = ({superlative, text, dur}) => {
  useEffect(() => {
    console.log(dur);
  }, [dur])
  return (
    <div class='stat-text'>
      <Grid container>
        <Grid item xs={12}>
         <h4>{superlative}</h4>
         <p>{text}</p>
        </Grid>
        <Grid item xs={4}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <DirectionsCarIcon sx={{mr: 2}}/>
            <p>By car</p>
          </div>
         <h4>{dur[1] || ' '}</h4>
        </Grid>
        <Grid item xs={4}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <TrainIcon sx={{mr: 2}} />
          <p>By train</p>
        </div>
         
         <h4>{dur[0] || ' '}</h4>
        </Grid>
        <Grid item xs={4}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <FlightIcon sx={{mr: 2}} />
          <p>By plane</p>
        </div>
         <h4>{dur[0] || ' '}</h4>
        </Grid>
      </Grid>
    </div>
  )
}

const CarbonText = ({superlative, text, carbon}) => {
  useEffect(() => {
    console.log(carbon);
  }, [carbon])
  return (
    <div class='stat-text'>
      <Grid container>
        <Grid item xs={12}>
         <h4>{superlative}</h4>
         <p>{text}</p>
        </Grid>
        <Grid item xs={4}>
         <p>By car</p>
         <h4>{carbon[0] || ' '}g</h4>
        </Grid>
        <Grid item xs={4}>
         <p>By train</p>
         <h4>{carbon[1] || ' '}g</h4>
        </Grid>
        <Grid item xs={4}>
         <p>By plane</p>
         <h4>{carbon[2] || ' '}g</h4>
        </Grid>
      </Grid>
    </div>
  )
}

const PriceText = ({superlative, text, carbon}) => {
  useEffect(() => {
    console.log(carbon);
  }, [carbon])
  return (
    <div class='stat-text'>
      <Grid container>
        <Grid item xs={12}>
         <h4>{superlative}</h4>
         <p>{text}</p>
        </Grid>
        <Grid item xs={4}>
         <p>By car</p>
         <h4>{carbon[0] || ' '}g</h4>
        </Grid>
        <Grid item xs={4}>
         <p>By train</p>
         <h4>{carbon[1] || ' '}g</h4>
        </Grid>
        <Grid item xs={4}>
         <p>By plane</p>
         <h4>{carbon[2] || ' '}g</h4>
        </Grid>
      </Grid>
    </div>
  )
}


const Stats = ({origin, destination, tripDuration, distance}) => {

  const [dist, setDist] = useState(0);
  const durationHandler = (tD, distance) => {      
    const timeDispParser = (dur, durName) => {
      var hC = Math.floor(dur / 3600);
      var mC = Math.floor(dur % 3600 / 60);
  
      var hDisplay = hC > 0 ? hC + (hC == 1 ? " hour " : " hours ") : "";
      var mDisplay = mC > 0 ? mC + (mC == 1 ? " minute" : " minutes") : "";
      let time = hDisplay + mDisplay
      return time;
    }


    let trainDur = timeDispParser(tD.value/4, 'trainDur');
    let carDur = timeDispParser(tD.value, 'carDur');  
    return [trainDur, carDur]
}

const carbonHandler = (distance = 0) => {
  let C_perKMCar = (0.192*distance).toFixed(2);
  let C_perKMTrain = (0.041*distance).toFixed(2);
  let C_perKMPlane = (0.225*distance).toFixed(2);
  console.table(C_perKMCar, C_perKMTrain, C_perKMPlane)
  return [C_perKMCar, C_perKMTrain, C_perKMPlane]
}

useEffect(() => {
  if(distance!==undefined){
    setDist(distance.value/1000);
  }
  console.log(dist);
}, [dist])

  return (
    <div id='stats'>
      <Grid container>
        <Grid item xs={12} md={6}>
        <h4>Statistics</h4>
          <Stack divider={<Divider variant='middle' color='white'/>}>
            <SpeedText superlative='Speed' text={`The route would connect ${origin} and ${destination} in`} dur={durationHandler(tripDuration)} />
            <CarbonText superlative='Carbon Savings' text={`The route between ${origin} and ${destination} would cost`} carbon={carbonHandler(dist)} />
            {/* <PriceText superlative='Carbon Savings'text={`The route would connect ${origin} and ${destination} in`} carbon={carbonHandler(dist)} /> */}
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