import React from 'react'
import './css/main-layout.scss'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebars'

const MainLayout = () => {

    return (
        <>
            <Sidebar />
            <div className="main">
                <div className="main__content">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default MainLayout
