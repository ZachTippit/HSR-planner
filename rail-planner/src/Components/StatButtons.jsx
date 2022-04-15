import { Button } from '@mui/material'
import React from 'react'

const buttons = ['Speed', 'Carbon Cost', 'Construction Cost', 'Learn More']

const StatButtons = () => {
  return (
    <div>
        <h4>Route info by:</h4>
        {buttons.map(button => (
            <Button variant='contained' sx={{mt: 1, mb: 1}} style={{width: '100%'}}>{button}</Button>
        ))}
    </div>
  )
}

export default StatButtons