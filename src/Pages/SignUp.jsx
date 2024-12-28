import React, { useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import OAuth from '../Components/OAuth';

function SignUp() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handelChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {

      setLoading(true);
      const res = await fetch('http://localhost:3000/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in ')

    }
      
      catch (error) {
      setLoading(false);
      setError(error.message);     
  }
};


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-10'> Sign Up</h1>
      <form onSubmit={handelSubmit} className='flex flex-col gap-5'>
        <input type="text" placeholder='username' className='border p-2 rounded-lg' id='username' name='username' onChange={handelChange} value={formData.username} />
        <input type="text" placeholder='Email' className='border p-2 rounded-lg' id='email' name='email' onChange={handelChange} value={formData.email} />
        <input type="password" placeholder='Password' className='border p-2 rounded-lg' id='password' name='password' onChange={handelChange} value={formData.password} />
        <button disabled={loading} type="submit" className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opactiy-80'> {loading ? 'Loading...' : 'sign up'}</button>
        <OAuth/> 
      </form>
      <div className='flex gap-3 m-3'>
        <p>Have an account</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      
    </div>

  )
}

export default SignUp
