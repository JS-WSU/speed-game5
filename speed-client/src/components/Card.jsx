import React from 'react'

function Card({ name, src, value}) {
  return (
    <div  value={value}>
      <img className='img-fluid' src={src} alt={name} />
    </div>
  )
}

export default Card