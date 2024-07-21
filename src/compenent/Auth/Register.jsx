import React, {useState} from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

function Register(props) {
  const [user,setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  })

  const navigate = useNavigate()
  const readValue = async (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log('users =', user)
      await axios.post(`/api/auth/register`, user)
      .then(res => {
        toast.success(res.data.msg)
        navigate('/login')
      }).catch(err => toast.error(err.response.data.msg))
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className='container align-items-center'>
      <div className="row mt-5">
        <div className="col-md-8 col-sm-12 col-md-2 offset-md-2 offset-lg-2">
          <div className="card">
            <div className="card-body p-0" id='auth'>
              <div className="row">

              <div className="col-md-6 col-lg-6 col-sm-12 bg-success p-5 p-sm-4 text-center " id='content'>
                  <div className="title">
                    <h5 className="display-5 text-light">Welcome Back!<br/> User</h5>
                  </div>
                  <div className="content">
                    <p className="text-light">
                      To keep connected with usplease login
                    </p>
                  </div>
                  <NavLink to={`/login`} className="btn btn-outline-light">login</NavLink>
                </div>

                <div className="col-md-6 col-lg-6 col-sm-12 p-5 bg-light text-center">
                  <div className="title">
                    <h5 className="display-5 text-success">Register</h5>
                  </div>
                  <form autoComplete='off'onSubmit={submitHandler}>
                  <div className="form-group mt-4">
                      <input type="text" name="name" value={user.name} onChange={readValue} id="name" placeholder='enter name' className='form-control' required />
                    </div>
                    <div className="form-group mt-2">
                      <input type="email" name="email" value={user.email} onChange={readValue} id="email" placeholder='enter email' className='form-control' required />
                    </div>
                    <div className="form-group mt-2">
                      <input type="number" name="mobile" value={user.mobile} onChange={readValue} id="mobile" placeholder='enter mobile' className='form-control' required />
                    </div>
                    <div className="form-group mt-2">
                      <input type="password" name="password" value={user.password} onChange={readValue} id="password" placeholder='enter password' className='form-control' required />
                    </div>
                    <div className="form-group mt-2">
                      <input type="submit" value="Register" className='btn btn-success' />
                    </div>
                  </form>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Register
