import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.tsx";
import "../style/defaultlayout.css";
import {useEffect, useState} from "react";
import axiosClient from "../axiosClient.js";
import Sidebar from "../views/Sidebar.tsx";
import Header from "../views/Header.tsx";


export default function DefaultLayout() {
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

     const toggleSidebar = () => {
          setIsSidebarOpen(!isSidebarOpen);
     };

     return (
          <div className="layout">
               <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
               <div className="main-content">
                    <Header toggleSidebar={toggleSidebar} />
                    <div className="page-content">
                         <Outlet /> {/* All your pages (BoardingHouse, Tenants, etc.) appear here */}
                    </div>
               </div>
          </div>
     );
}

