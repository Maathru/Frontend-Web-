import React from 'react'
import { Button } from './button';

 const popup = () => {
  return (
    <div className='w-56 h-56'>
        <p>Is the user existing one or new one?</p>
        <Button>Existing</Button>
        <Button>New</Button>
    </div>
  )
}

export default popup;