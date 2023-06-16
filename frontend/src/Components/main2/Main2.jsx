import React from 'react'
import { Outlet } from 'react-router-dom'
import '../../css/main.css'
import { MainNav2 } from './MainNav2'
import { SideBar2 } from './SideBar2'
export const Main2 = () => {
  return (
    <main>
        <MainNav2/>
        <section className='main-app'>
            <SideBar2/>
            <Outlet/>
        </section>
    </main>
  )
}
