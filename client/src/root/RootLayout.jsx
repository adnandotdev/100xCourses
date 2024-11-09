import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
export default function RootLayout() {
  return (
    <div className='w-full h-full '>
        <NavBar />
        <section className = "flex flex-1 h-full">
            <Outlet />
        </section>
    </div>
  )
}
