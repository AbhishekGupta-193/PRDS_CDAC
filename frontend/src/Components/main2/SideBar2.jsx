import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { SiFormstack } from 'react-icons/si'
import { FaChartLine } from 'react-icons/fa';
import '../../css/side-bar.css'

export const SideBar2 = () => {
  const [active, setActive] = useState('dashboard')

  return (
    <aside className='side-bar'>
      <Link className={`sidebar-item ${active === 'HR' ? 'active' : ''}`} onClick={() => setActive('HR')} to='HR'>
        <i><FaUserAlt /></i>
        <span>HR Dashboard</span>
      </Link>
      <Link className={`sidebar-item ${active === 'APAR_Track' ? 'active' : ''}`} onClick={() => setActive('APAR_Track')} to='APAR_Track'>
        <i><SiFormstack /></i>
        <span>APAR Tracking</span>
      </Link>
      <Link className={`sidebar-item ${active === 'Analytics' ? 'active' : ''}`} onClick={() => setActive('Analytics')} to='Analytics'>
        <i> <FaChartLine /> </i>
        <span>Analytics</span>
      </Link>
    </aside>
  )
};