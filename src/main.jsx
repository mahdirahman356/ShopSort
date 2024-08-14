import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Layout from './layout/layout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import Context from './Context/Context';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>
      },
    ]
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Context>
    <RouterProvider router={router} />
    </Context>
    </StrictMode>,
)
