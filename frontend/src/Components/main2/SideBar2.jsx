import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {FaUserAlt} from 'react-icons/fa'
import {SiFormstack} from 'react-icons/si'
import '../../css/side-bar.css'
export const SideBar2 = () => {
    const [active,setActive] = useState('notes')
  return (
    <aside className='side-bar'>
        <Link className={`sidebar-item ${active=='notes'?'active':''}`} onClick={()=>setActive('notes')} to='notes'>
            <i><FaUserAlt/></i>
            <span>Employee</span>
        </Link>
        <Link className={`sidebar-item ${active=='notes'?'active':''}`} onClick={()=>setActive('notes')} to='notes'>
            <i><SiFormstack/></i>
            <span>Forms</span>
        </Link>
    </aside>
  )
}
