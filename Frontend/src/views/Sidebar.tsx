import BoardingHouses from "./BoardingHouses.tsx";
import  '../style/sidebar.css';
import {NavLink} from "react-router-dom";
import React, { useState } from "react"; // ✅ make sure useState is imported

export default function Sidebar({ isOpen, toggleSidebar }) {
     return (
          <div className={`sidebar ${isOpen ? "active" : ""}`}>
               <div className="sidebar-header">
                    <span className="logo">Logo here</span>
                    <button className="close-btn" onClick={toggleSidebar}>×</button>
               </div>

               <nav className="sidebar-nav">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/boardinghouse">Boarding Houses</NavLink>
                    <NavLink to="/tenants">Tenants</NavLink>
                    <NavLink to="/payments">Payments</NavLink>
                    <NavLink to="/maintenance">Maintenance Requests</NavLink>
                    <NavLink to="/reports">Reports</NavLink>
                    <NavLink to="/users">Users</NavLink>
               </nav>
          </div>
     );
}
