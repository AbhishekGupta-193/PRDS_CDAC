import React from 'react'
import '../../css/empty.css'
export const Empty = ({icon,info}) => {
  return (
    <div className='empty-cont'>
        <i className={icon}></i>
        <p>{info}</p>
    </div>
  )
}
