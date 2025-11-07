import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.tsx";

export default function GuestLayout() {
     const { token } = useStateContext();

     // if user already logged in → go to home
     if (token) {
          return <Navigate to="/" />;
     }

     return (
          <div>
               <Outlet />
          </div>
     );
}
