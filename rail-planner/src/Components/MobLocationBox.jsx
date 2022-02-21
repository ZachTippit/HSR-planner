import React from 'react'

const MobLocationBox = ({checkOriginDest}) => {
  return (
    <div id='mob-lcn-box-container'>
      <h3 style={{textAlign: 'center', fontWeight: 'bold'}}>Rail Planner</h3>
      <form onSubmit={(e) => {e.preventDefault(); checkOriginDest(e.target[0].value, e.target[1].value);}} id='location-form'>
        <input className='loc-input' type='text' id='start-city' name='start-city' placeholder='Starting location' />
        <input className='loc-input' type='text' id='end-city' name='end-city' placeholder='Ending location' />
        <button id='loc-form-submit' onSubmit={(e) => e.preventDefault()}>Make a line</button>
      </form>
    </div>
  )
}

export default MobLocationBox