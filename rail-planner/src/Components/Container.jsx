import React from 'react'
import { Text, Stats, Extras } from './'
import CarbonFootprint from './CarbonFootprint'
import StatButtons from './StatButtons'

const Container = ({isMobile, isDarkMode, checkOriginDest, origin, destination, tripDuration, tripDistance, dirResponse}) => {
  return (
    <div id='container'>
        {/* {isMobile && <MobLocationBox checkOriginDest={checkOriginDest}/>} */}
        {dirResponse === false ? <Text /> : <StatButtons />}
        <Stats origin={origin} destination={destination} tripDuration={tripDuration} distance={tripDistance}/>
        <CarbonFootprint />
        <Extras checkOriginDest={checkOriginDest}/>
    </div>
  )
}

export default Container