import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar'>
            <NavLink to="/products">
                <div>Products</div>
            </NavLink>
            {/* <NavLink to="/users">
                <div>Users</div>
            </NavLink> */}
        </div>
    )
}

export default Navbar