import React from 'react'
import {Outlet} from 'react-router-dom'
import './root.css'
import Navbar from '../NavBar/Navbar'
const Root = () => {
    return (
        <>
            <div className='nav'>
                <Navbar></Navbar>
                
            </div>
            <Outlet/>
        </>
        
    )
}

export default Root