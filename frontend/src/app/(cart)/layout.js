'use client'
import NavBar from '@/components/NavBar'
import React from 'react'
import Footer from '@/components/Footer'
import SideBar from '@/components/SideBar'
import user_navbar from '@/config/user_navbar'
import Breadcrumbs from '@/components/BreadCrumbsComponent'
const layout = ({children}) => {

  return (
  <div>
        <div className='fixed z-400 w-screen'><NavBar/></div>
        <div className="md:hidden bg-orange-500 text-slate-50 mt-18 rounded-xl w-100 mx-3 fixed z-100"></div>
       
        <div className='flex'>
          <div className='w-[300] hidden md:block  md:w-[230] my-30 ml-4 fixed'>
            <SideBar data={user_navbar} key={user_navbar._id}/>
          </div>
          <div className='md:ml-[230] mt-30 m-2 w-screen h-screen'><Breadcrumbs />{children}</div>
        </div>
        <Footer/>
    </div>
  )
}

export default layout