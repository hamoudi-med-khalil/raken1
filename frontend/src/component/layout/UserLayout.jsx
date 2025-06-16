import React from 'react'
import Header from '../commun/Header'
import Footer from '../commun/Footer'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <> 
    {/** Header */}
    <Header />
    {/** Main Content */}
    <Outlet />
    {/** Footer */}
     <Footer />   
    </> 
  )
}

export default UserLayout