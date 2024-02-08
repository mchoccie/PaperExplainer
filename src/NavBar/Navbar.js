import React from 'react'
import './Navbar.css'
import {NavLink} from 'react-router-dom'
const Navbar = () => {
    return (
    <div className='navbar'>
        <ul>
            <li className="logo">
                Paper Explainer
            </li>
            <li id="dash"><NavLink to="/dashboard" style={({isActive, isPending}) => {
                return {
                color: isActive ? "gray" : "white",
                textDecoration: 'none'
                };
            }}>Dashboard</NavLink></li>
            <li><NavLink to="/" style={({isActive, isPending}) => {
                return {
                color: isActive ? "gray" : "white",
                textDecoration: 'none'
                };
            }}>Upload</NavLink></li>
        </ul>

    </div>
    )
}

export default Navbar