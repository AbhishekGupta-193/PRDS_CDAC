import React from 'react'
import { Outlet } from 'react-router-dom'
import { MainNav } from './MainNav'
import { SideBar } from './SideBar'
import '../../css/main.css'
export const Main = () => {
  return (
    <main className='main-class'>
        <MainNav/>
        <section className='main-app-emp'>
            <SideBar/>
            <Outlet/>
        </section>
    </main>
  )
}