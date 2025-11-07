// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import router from './Router.tsx'
import {RouterProvider} from "react-router-dom";
import {ContextProvider} from "./context/ContextProvider.tsx";
import React from "react";

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
       <ContextProvider>
            <RouterProvider router={router} />
       </ContextProvider>
  </React.StrictMode>,
)
