import Sidebar from "./Sidebar.tsx";
import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.tsx";
import axiosClient from "../axiosClient.js";
import {useEffect} from "react";
import '../style/header.css';


interface HeaderProps {
     toggleSidebar?: () => void
}

export default function Header({toggleSidebar}: HeaderProps) {
     const {user, token, setUser, setToken} = useStateContext();

     // if user is not logged in → go to login
     if (!token) {
          return <Navigate to="/login"/>;
     }

     const onLogout = (e) => {
          e.preventDefault();
          // setUser(null);
          // setToken(null);
          // localStorage.clear();
          axiosClient.post('/logout')
               .then(({}) => {
                    setUser(null)
                    setToken(null)
               })
     };

     useEffect(() => {
          axiosClient.get('/user')
               .then(({data}) => {
                    setUser(data)
               })
     }, [])
     return (
          <header className="header">
               <button className="menu-btn" onClick={toggleSidebar}>
                    ☰
               </button>
               <div className="header-right">
                    <span>{user.name}</span>
                    <button onClick={onLogout} className="logout-btn">Logout</button>
               </div>
          </header>
     );

}