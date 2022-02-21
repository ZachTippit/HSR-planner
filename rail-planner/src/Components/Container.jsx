import React from 'react'
import { Text, Stats, Extras } from './'
import MobLocationBox from './MobLocationBox'

const Container = ({isMobile, isDarkMode, checkOriginDest, origin, destination, tripDuration}) => {
  return (
    <div id='container'>
        {isMobile && <MobLocationBox checkOriginDest={checkOriginDest}/>}
        <Text />
        <Stats origin={origin} destination={destination} tripDuration={tripDuration}/>
        <Extras checkOriginDest={checkOriginDest}/>
    </div>
  )
}

export default Container