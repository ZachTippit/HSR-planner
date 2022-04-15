import React from 'react'
import {Autocomplete} from '@react-google-maps/api'

const LocationBox = ({checkOriginDest}) => {
  return (
    <div id='search'>
      <h3 style={{textAlign: 'center', fontWeight: 'bold'}}>High-Speed Rail Planner</h3>
      <form onSubmit={(e) => {e.preventDefault(); checkOriginDest(e.target[0].value, e.target[1].value);}} id='location-form'>
        <Autocomplete>
          <input className='loc-input' type='text' id='start-city' name='start-city' placeholder='Starting location' />
        </Autocomplete>
        <Autocomplete>
          <input className='loc-input' type='text' id='end-city' name='end-city' placeholder='Ending location' />
        </Autocomplete>
        <button id='loc-form-submit' onSubmit={(e) => e.preventDefault()}>Make a line</button>
      </form>
    </div>
  )
}

export default LocationBox