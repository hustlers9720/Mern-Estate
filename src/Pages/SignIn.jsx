import React, { useState } from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice.js';
import OAuth from '../Components/OAuth.jsx';

function SignIn() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const {loading , error} = useSelector((state)=> state.user);
  // console.log(error);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handelChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
        dispatch(signInStart());
        const res = await fetch('http://localhost:3000/api/auth/signin',
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
        dispatch(signInFailure(data.message));
        return;
      }
      else{
        dispatch(signInSuccess(data.data));
        navigate('/')
      }

    }
      
      catch (error) {
        console.log(error);
        
       dispatch(signInFailure(error.message));  
  }
};


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-10'> Sign In</h1>
      <form onSubmit={handelSubmit} className='flex flex-col gap-5'>
        <input type="text" placeholder='Email' className='border p-2 rounded-lg' id='email' name='email' onChange={handelChange} value={formData.email} />
        <input type="password" placeholder='Password' className='border p-2 rounded-lg' id='password' name='password' onChange={handelChange} value={formData.password} />
        <button disabled={loading} type="submit" className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opactiy-80'> {loading ? 'Loading...' : 'sign in'}</button>
        <OAuth/>
      </form>
      <div className='flex gap-3 m-3'>
        <p>Don't Have an account</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>

  )
}

export default SignIn
