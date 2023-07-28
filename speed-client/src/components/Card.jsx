import React from 'react'

function Card({ name, src, value}) {
  return (
    <div  value={value}>
      <img className="w-25" style={{ width: 100 }} src={src} alt={name} />
    </div>
  )
}

export default Card