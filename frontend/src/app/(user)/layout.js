'use client'
import NavBar from '@/components/NavBar'
import React from 'react'
import SearchBar from '@/components/SearchBar'
import Footer from '@/components/Footer'
import SideBar from '@/components/SideBar'
import user_navbar from '@/config/user_navbar'
const layout = ({children}) => {

  return (
    <div>
        <NavBar/>
        <div className="md:hidden bg-amber-600 text-white  m-3 rounded-xl"><SearchBar/></div>
        <div className='flex'>
          <div className=' ml-4'>
            <SideBar data={user_navbar} key={user_navbar._id}/>
          </div>
          <div className='md:ml-[230]'>{children}</div>
        </div>
        <Footer/>
    </div>
  )
}

export default layout