import React, {useEffect, useState} from 'react'
import { Nav, Map, Container, Footer } from './Components/'
import './App.css';
import { useMediaQuery } from '@mui/material'

const App = () => {
  
  const [origin, setOrigin] = useState()
  const [destination, setDestination] = useState()
  const [dirResponse, setDirResponse] = useState(false)
  const [tripDuration, setTripDuration] = useState(0)
  const [tripDistance, setTripDistance] = useState()

  const isMobile = useMediaQuery('(max-width:800px)')

  const checkOriginDest = (newOrigin, newDestination) => {
    setOrigin(newOrigin)
    setDestination(newDestination)
  }

  const directionsCallback = (response) => {
    console.log(response);

    if(response!==null){
      if(response.status === 'OK') {
        setDirResponse(response)
        setOrigin(response.routes[0].legs[0].start_address)
        setDestination(response.routes[0].legs[0].end_address)
        setTripDistance(response.routes[0].legs[0].distance)
        setTripDuration(response.routes[0].legs[0].duration)
      } else {
        console.log('response: ', response)
      }
    }
  }

  useEffect(() => {
    console.log(origin, destination)
  }, [origin, destination])

  useEffect(() => console.log(tripDistance), [tripDistance])

  return (
   <div>
    <Nav />
    <Map isMobile={isMobile} isDarkMode={false} origin={origin} destination={destination} checkOriginDest={checkOriginDest} directionsCallback={directionsCallback} dirResponse={dirResponse} />
    <Container isMobile={isMobile} isDarkMode={false} checkOriginDest={checkOriginDest} origin={origin} destination={destination} tripDuration={tripDuration} tripDistance={tripDistance} dirResponse={dirResponse}/>
    <Footer />
   </div>
  );
}

export default App;
