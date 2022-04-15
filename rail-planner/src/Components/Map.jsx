import React, {useState, useEffect, useCallback} from 'react'
import { Paper, Typography } from '@mui/material'
import LocationBox from './LocationBox'
import mapStyles from './mapStyles'
import { Autocomplete, DirectionsRenderer, DirectionsService, GoogleMap, LoadScript, Marker, MarkerShapeCircle, StandaloneSearchBox } from '@react-google-maps/api'
import BounceLoader from 'react-spinners/BounceLoader'
import {default as DestTrain} from '../img/train.png'
import {default as Circle} from '../img/rec.png'

// const options = {
//     zoomControlOptions: {
//       position: google.maps.ControlPosition.RIGHT_CENTER // 'right-center' ,
//       // ...otherOptions
//     }
//   }

const containerStyle = {
    width: '100%',
    height: '100%'
  };
const Map = ({isMobile, isDarkMode, origin, destination, checkOriginDest, directionsCallback, dirResponse, tripDuration}) => {
    
    const [center, setCenter] = useState(isMobile ? {lat: 36, lng: -95} : {lat: 38, lng: -78})
    const [zoom, setZooom] = useState(isMobile ? 3 : 4)
    const [responded, setResponded] = useState(false)
    useEffect(() => {
        console.log(isMobile)
    }, [])
    
    //   const renderMap = () => {
    //     // wrapping to a function is useful in case you want to access `window.google`
    //     // to eg. setup options or create latLng object, it won't be available otherwise
    //     // feel free to render directly if you don't need that
    //     // const onLoad = useCallback(
    //     //   function onLoad (mapInstance) {
    //     //     // do something with map Instance
    //     //   }
    //     // )
    //     return <GoogleMap
    //       options={options}
    //     //   onLoad={onLoad}
    //     >
    //       {
    //         // ...Your map components
    //       }
    //     </GoogleMap>
    //   }
    
    //   if (loadError) {
    //     return <div>Map cannot be loaded right now, sorry.</div>
    //   }
    
      return(
        <div id='map-container'>
          { isNaN(center) ? 
            <LoadScript googleMapsApiKey={`${process.env.REACT_APP_MAPS_KEY}`} libraries={["places"]}>
                <GoogleMap
                    id='direction-example'
                    mapContainerStyle={containerStyle}
                    options={{styles: mapStyles, disableDefaultUI: true}}
                    center={center}
                    zoom={zoom}
                >
                {dirResponse === false &&  <LocationBox checkOriginDest={checkOriginDest}/>}
                { /* Child components, such as markers, info windows, etc. */ }
                <Marker
                    opacity={0.8}
                    icon={DestTrain}
                    position={{lat: 45, lng: -100}}/>
                <Marker
                    opacity={0.8}
                    icon={Circle}
                    position={{lat: 39.3, lng: -105}}/>
                {(destination !== '' && origin !== '' && !responded) && 
                    <DirectionsService
                        options={{
                            destination: destination,
                            origin: origin,
                            travelMode: 'DRIVING'
                        }}
                        callback={res => {
                            directionsCallback(res)
                            setResponded(true)}
                        }
                    />
                }
                {dirResponse !== '' && <DirectionsRenderer options={{directions: dirResponse}} />}
              </GoogleMap>
            </LoadScript>
        : 
            <BounceLoader color={'#46175A'} speedMultiplier={0.6} size={100} loading={''} />}
            {/* { !isMobile && <LocationBox checkOriginDest={checkOriginDest}/>} */}
        </div>
      ) 
      
    // return(
    //     <div id='map-container'>
    //        <GoogleMapReact
    //         bootstrapURLKeys={{key: process.env.REACT_APP_MAPS_KEY}}
    //         defaultCenter={center}
    //         center={center}
    //         defaultZoom={zoom}
    //         margin={[50,50,50,50]}
    //         options={{styles: mapStyles}}
    //         onChange={''}
    //         onChildClick={''}
    //        >
    //            <Marker 
    //             lat={center.lat}
    //             lng={center.lng}
    //             text={'FWEEE'}
    //             />
    //        </GoogleMapReact>
    //        
    //     </div>
    // )
}

export default Map;