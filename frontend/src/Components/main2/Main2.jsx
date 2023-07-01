import React from 'react'
import { Outlet } from 'react-router-dom'
import '../../css/main.css'
import { MainNav2 } from './MainNav2'
import { SideBar2 } from './SideBar2'
import RightSidebar from './RightSidebar'
export const Main2 = () => {
  return (
    <main className='main-class'> 
        <MainNav2/>
        <section className='main-app-hr'>
            <SideBar2/>
            <div className="outlet">
              <Outlet/>
            </div>
            <RightSidebar/>
        </section>
    </main>
  )
}