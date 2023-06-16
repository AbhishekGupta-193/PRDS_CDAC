import React from 'react'
import { Outlet } from 'react-router-dom'
import '../../css/main.css'
import { MainNav3 } from './MainNav3'
import { SideBar3 } from './SideBar3'
export const Main3 = () => {
  return (
    <main>
        <MainNav3/>
        <section className='main-app'>
            <SideBar3/>
            <Outlet/>
        </section>
    </main>
  )
}
