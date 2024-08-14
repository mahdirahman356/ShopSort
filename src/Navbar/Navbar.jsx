import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/Context";
import { VscSignOut } from "react-icons/vsc";
import profile from "../assets/image/user.avif"
import Swal from "sweetalert2";


const Navbar = () => {
    
    const { user, userLogOut } = useContext(AuthContext)
    
    const handleSignOut = () => {
        userLogOut()
          .then(() => {
            console.log("Sign Out")
            Swal.fire({
                title: 'Logged Out',
                text: 'You have safely signed out.',
                icon: 'error',
                confirmButtonText: 'Close'
            });
          })
          .catch(error => {
            console.log(error.message)
          })
      }

    return (
        <div className=" bg-base-100">
            <div className="navbar bg-base-100 md:w-[80%] mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Item 1</a></li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">ShopSort</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-5">
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                    </ul>
                </div>
                <div className="navbar-end">
                {
            user &&
            <>
              <details className="dropdown dropdown-end">
                <summary className="btn btn-ghost p-0 rounded-full m-1">
                  <img className="object-cover w-12 h-12 border-2  rounded-full avatar" src={user.photoURL ? user.photoURL : profile} />
                </summary>
                <ul className="p-2 shadow menu dropdown-content text-black z-10 bg-base-100 rounded-box w-52">
                  <li><a>{user.displayName}</a></li>
                  <li onClick={handleSignOut}><a><VscSignOut className="text-xl" />Sign Out</a></li>
                </ul>
              </details>
            </>
          }
                </div>
            </div>
        </div>
    );
};

export default Navbar;