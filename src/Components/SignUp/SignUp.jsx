import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Context";
import Swal from "sweetalert2";

const SignUp = () => {

  const { createAccount, userUpdate } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleSignUp = (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value

    console.log(name, email, password)

    // sign up by firebase
    createAccount(email, password)
      .then(result => {
        console.log(result.user)
        // update name
        userUpdate(name)
          .then(() => {
            // set a sweet alert for success message
            Swal.fire({
              title: 'Success',
              text: 'User Created Successfully',
              icon: 'success',
              confirmButtonText: 'ok'
            })
            navigate("/");
          })
      })
      .catch(error => {
        console.log(error.message)
        // set a sweet alert for error message
        Swal.fire({
          title: 'Error',
          text: 'Email already in use',
          icon: 'error',
          confirmButtonText: 'close'
        })
      })


  }


  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">SignUp now!</h1>
          <p className="py-6 lg:pr-52">
            Welcome to ShopSort! Please log in to access your account and explore a seamless shopping experience. Use your Google account or create a secure sign up with your email and password.
          </p>

          <p className="mt-4">already have an account, please <Link to="/login"><span className="text-blue-500 underline">Sign Up</span></Link></p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
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

export default SignUp;