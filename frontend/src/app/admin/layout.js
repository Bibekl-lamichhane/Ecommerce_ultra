import React from 'react'
import admin_navbar from '@/config/admin_navbar.json'
import SideBar from '@/components/SideBar';
const layout = ({children}) => {
  return (
    <div  className='flex'>
      <div className='w-[250] bottom-20'><SideBar data={admin_navbar} key={admin_navbar.id}/></div>  
        <div>{children}</div>    
    </div>
  )
}

export default layout