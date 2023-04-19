import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './loginstyle.css'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [credentials, setCredentials] = useState({ name:"", email: "", password: "" })
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });

    const json = await response.json()
    console.log(json)

    if (json.success) {
      localStorage.setItem('token', json.auth_token)
      navigate('/')
    } else {
      alert(`${json.error}`)
    }

    setCredentials({ name: "", email: "", password: "" })

  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div class="outer-box container">
        <div class="inner-box">
            <header class="signup-header">
                <h1>SignUp</h1>
                <p>It just take 30 seconds</p>
            </header>
            <main class="signup-body">
                <form onSubmit={handleSubmit}>
                    <p>
                        <label for="fullname">Full Name</label>
                        <input type="text" id="name" value={credentials.name} name="name" onChange={onChange} minLength={3} placeholder="Enter your Name" required />
                    </p>
                    <p>
                        <label for="email">Your Email</label>
                        <input type="email" id="email" name="email" value={credentials.email} onChange={onChange} placeholder="yourmail@gmail.com" required />
                    </p>
                    <p>
                        <label for="password">Your Password</label>
                        <input type='password' id="password" name="password" value={credentials.password} minLength={5} onChange={onChange} placeholder="Enter atleast 8 characters" required />
                    </p>
                    <p>
                        <input type="submit" id="submit" value="Create Account" required />
                    </p>
                </form>
            </main>
            <footer class="signup-footer" >
                <p>Already have an Account? <Link to="/login">Login</Link></p>
            </footer>
        </div>
        <div class="circle c1"></div>
        <div class="circle c2"></div>
    </div>




    // {/* <div className="container mt-3">
    // <h2 className='text-center'>Signup to create a New Account</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="mb-3 my-3">
    //       <label htmlFor="name" className="form-label">Name</label>
    //       <input type="text" className="form-control" id="name" name="name" aria-describedby="name" onChange={onChange} minLength={3} required/>
    //     </div>
    //     <div className="mb-3 my-3">
    //       <label htmlFor="email" className="form-label">Email address</label>
    //       <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
    //       <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    //     </div>
    //     <div className="mb-3">
    //       <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
    //       <input type="password" name="password" className="form-control" id="exampleInputPassword1" onChange={onChange} minLength={5} required/>
    //     </div>
    //     <div className="mb-3">
    //       <label htmlFor="cPassword" className="form-label" >Confirm Password</label>
    //       <input type="password" name="password" className="form-control" id="cPassword" onChange={onChange} minLength={5} required/>
    //     </div>
    //     <button type="submit" className="btn btn-primary">Submit</button>
    //   </form>
    // </div> */}
  )
}

export default Signup