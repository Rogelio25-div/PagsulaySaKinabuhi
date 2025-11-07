// Import function to create routes for the app
import { createBrowserRouter } from "react-router-dom";

// Import pages (views)
import Login from './views/Login.tsx';
import Register from './views/Register.tsx';
import User from './views/User.tsx';
import UserForm from "./views/UserForm.tsx";

// Import layout components
import DefaultLayout from "./components/DefaultLayout.tsx";
import GuestLayout from './components/GuestLayout.tsx';
import BoardingHouses from "./views/BoardingHouses.tsx";
import Dashboard from "./views/Dashboard.tsx";
import House1RoomListPage from "./views/House1RoomListPage.tsx";
import RoomDetailsPage from "./views/RoomDetailsPage.tsx";
// import BHform from "./views/BHform.tsx";

// Create the router configuration
const Router = createBrowserRouter([

     {
          // Main path for logged-in users
          path: '/',
          element: <DefaultLayout />, // Use DefaultLayout as the main wrapper

          // Nested routes inside DefaultLayout
          children: [
               {
                    index: true,
                    element: <Dashboard/>,
               },
               {
                    path: '/dashboard',
                    element: <Dashboard/>,
               },
               {
                    // Page that lists all users
                    path: '/users',
                    element: <User />,
               },
               {
                    // Page to create a new user
                    path: '/users/new',
                    element: <UserForm key="UserCreate" />,
               },
               {
                    // Page to edit an existing user (uses ID from URL)
                    path: '/users/:id',
                    element: <UserForm key="UserUpdate" />,
               },
               {
                    path: '/boardinghouse',
                    element: <BoardingHouses/>,
               },
               {
                    path: '/roomlist',
                    element: <House1RoomListPage/>,
               },
               {
                    path: '/roomdetails',
                    element: <RoomDetailsPage/>,
               },
               // {
               //      path: '/boardinghouse/new',
               //      element: <BHform/>,
               // }
          ],
     },

     {
          // Routes for guests (not logged in)
          path: '/',
          element: <GuestLayout />, // Use GuestLayout for login/register pages

          // Nested routes inside GuestLayout
          children: [
               {
                    // Login page route
                    path: '/login',
                    element: <Login />,
               },
               {
                    // Register page route
                    path: '/register',
                    element: <Register />,
               },
          ],
     },

]);

// Export router to be used in the main app
export default Router;
