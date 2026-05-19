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
        <NavBar/>
        <div className='flex'>
          <div className='w-[250] hidden md:block  md:w-[230] my-30 ml-4 fixed'>
            <SideBar data={user_navbar} key={user_navbar._id}/>
          </div>
          <div className='md:ml-70 m-4 md:w-800 '><Breadcrumbs />{children}</div>
        </div>
        <Footer/>
    </div>
  )
}

export default layout