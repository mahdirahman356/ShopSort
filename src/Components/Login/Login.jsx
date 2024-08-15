import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Context";
import Swal from "sweetalert2";

const Login = () => {

  const { loginUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value

    console.log(email, password)
    
    // login by firebase
    loginUser(email, password)
      .then(result => {
        console.log(result.user)
        // set a sweet alert for success message
        Swal.fire({
          title: 'Success',
          text: 'User Added Successfully',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        navigate("/");
      })
      .catch(error => {
        console.log(error.message);
        // set a sweet alert for error message
        Swal.fire({
          title: 'Error',
          text: 'User is not available',
          icon: 'error',
          confirmButtonText: 'Close'
        });
      });

  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6 lg:pr-52">
            Welcome to ShopSort! Please log in to access your account and explore a seamless shopping experience. Use your Google account or create a secure login with your email and password.
          </p>

          <p className="mt-4">don not have an account, please <Link to="/sign-up"><span className="text-blue-500 underline">login</span></Link></p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="password" className="input input-bordered" required />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;