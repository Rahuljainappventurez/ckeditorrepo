import { Grid } from '@mui/material'
import ArgonBox from 'components/ArgonBox'
import Footer from 'examples/Footer'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React from 'react'
import { Outlet } from 'react-router-dom'
import './main-layout.scss'

const MainLayout = () => {
  return (
    <>
      <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <Grid className='main-layout-container'>
          <Outlet />
        </Grid>
      </ArgonBox>
      {/* <Footer /> */}
    </DashboardLayout>
    </>
  )
}

export default MainLayout
